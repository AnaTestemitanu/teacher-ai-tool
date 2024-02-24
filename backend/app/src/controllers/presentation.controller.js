import Anthropic from '@anthropic-ai/sdk';
import { pdfText } from "../mock/pdfText.js"
import pptxgen from "pptxgenjs";
import OpenAI from "openai";

export default class PresentationController {
    constructor() {
        this.anthropic = new Anthropic({
            apiKey: "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"
        });
        this.openai = new OpenAI({ apiKey: "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"});
        this.classLevel = [
            "lower ability",
            "medium ability",
            "high ability"
        ]
        this.tone = [
            "Have some humourous moments in the slides, while keeping everything factually accurate",
            "Have some humorous moments in the slides, and use occasional useful analogies to help explain concepts, while keeping everything factually correct",
            "Use occasional useful analogies to help explain concepts, while keeping everything factually correct",
        ]
    }
    extractTextFromPdf() {
        return pdfText;
    }

    async generateSlides(pdfText, classData, profileData) { 
        const language = profileData.MainLanguage;
        const classLevel = this.classLevel[classData.ClassLevel];
        const classAge = classData.ClassAge;
        const tone = classData.Tons;
        let i = -1;
        if (tone.includes('humor')) i = 0;
        if (tone.includes('analogies') && tone.includes('humor')) i = 1;
        if (tone.includes('analogies')) i = 2;
        const toneDesc = i >= 0 ? this.tone[i] : "";

        const message = await this.anthropic.messages.create({
            model: "claude-2.1",
            max_tokens: 1000,
            temperature: 0,
            system: `You are an expert in summarising text-book content into a format which can be inputted into a PowerPoint in ${language}.\n\
            You will be tasked with splitting a large chunk of text into separate slides to build a narrative which will support students in learning the content.\n\
            These slides should start with a title slide and each slide should be separated by XML tags which are labelled with <slide></slide>. \
            You should prioritise all of the important content being included, over reducing the number of slides\
            You should not introduce or conclude the slides, just output them. Limit to 3 slides`,
            messages: [
                {
                    "role": "user", 
                    "content": `${pdfText} Please start by reading and understanding this text. \
                                Turn this text into content for slides suitable for a class of ${classLevel} ${classAge}-year-olds.\
                                Ensure that no valuable content has been missed out.\
                                Have each slide cover a certain theme to build a narrative over the slides making the content easier to understand and digest.\
                                ${toneDesc}`
                }
            ]
        });

        const response = message.content[0].text;
        const rawSlides = response.split(/<\/?slide>/).filter(text => text.trim() !== '');
        console.log({size: rawSlides.length})
        return rawSlides;
    }

    async generateSlideNotes(slides, classData, profileData) {
        const age = profileData.Age;
        const yoe = profileData.YearsOfExperience;
        const classLevel = this.classLevel[classData.ClassLevel];
        const classAge = classData.ClassAge;

        const keynotes = [];
        for (const slide of slides) {
            const message = await this.anthropic.messages.create({
                model: "claude-2.1",
                max_tokens: 1000,
                temperature: 0,
                system: "You are an expert in creating helpful summaries of the content in a presentation's slide.\
                You should design these summaries to support a teacher in delivering the slide content.\
                Do not include XML tags",
                messages: [
                    {
                        "role": "user", 
                        "content": `${slide} Please understand the content in this slide.\
                            Create a set of notes for a ${age}-year-old teacher with ${yoe} years of experience.\
                            These notes should help the teacher communicate the content of the slide more effectively to a class of ${classLevel} ${classAge}-year-olds.\
                            The notes can also include relevant exercises for students to complete.\
                            Skip the preamble.`
                    }
                ]
            });
            keynotes.push(message.content[0].text)
        }
        return keynotes;
    }

    async generateSlideImage(slides) {
        const images = [];
        for (const slide of slides) {
            const message = await this.anthropic.messages.create({
                model: "claude-2.1",
                max_tokens: 1000,
                temperature: 0,
                system: "",
                messages: [
                    {
                        "role": "user", 
                        "content": `You are a teacher using a text-to-image generator to create images for teaching slides.\
                        Turn this slide content ${slide} into one prompt that will produce a visually engaging context-based image for the slide.\
                        If you don't feel comfortable generating a prompt from this slide, generate a prompt that you think will be appropriate.\
                        Skip the preamble.`
                    }
                ]
            });
            images.push(message.content[0].text)
        }
        return images;
    }

    combine(slides, notes, images) {
        let combined = [];

        const maxLength = Math.max(slides.length, notes.length, images.length);
    
        for (let i = 0; i < maxLength; i++) {
            combined.push({
                content: slides[i] || '',
                note: notes[i] || '',
                img: images[i] || ''
            });
        }
    
        return combined;
    }

    async generateFile(slides) {
        const pptx = new pptxgen();
        for (const slide of slides) {
            const slideObj = pptx.addSlide();
            slideObj.addText(slide.content, { x: 0.5, y: 0.5, fontSize: 18, color: '000000' });
          
            if (slide.img) {
                try {
                    const response = await this.openai.images.generate({
                        model: "dall-e-3",
                        prompt: slide.img,
                        n: 1,
                        size: "1024x1024",
                      });
                      slideObj.addImage({ path: response.data[0].url, x: 1, y: 1, w: 5, h: 3 });
                } catch (err) {
                    console.log("Open AI was not able to generate this image")
                }
            }
          }
          pptx.writeFile("presentations/Presentation.pptx").then(() => {
            console.log("Presentation created!");
          });
    }
}
