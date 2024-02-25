import Anthropic from '@anthropic-ai/sdk';
import { pdfText } from "../mock/pdfText.js"
import pptxgen from "pptxgenjs";
import OpenAI from "openai";
import axios from 'axios';
import fs from 'fs';

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
            You should not introduce or conclude the slides, just output them. Limit to 5 slides`,
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
            // console.log(`${slide} Please understand the content in this slide.\
            // Create a set of notes for a ${age}-year-old teacher with ${yoe} years of experience.\
            // These notes should help the teacher communicate the content of the slide more effectively to a class of ${classLevel} with ${classAge}-year-olds students.\
            // The notes can also include relevant exercises for students to complete.\
            // Skip the preamble.`)
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
                            These notes should help the teacher communicate the content of the slide more effectively to a class of ${classLevel} with ${classAge}-year-old's students.\
                            The notes can also include relevant exercises for students to complete.\
                            Skip the preamble.`
                    }
                ]
            });
            keynotes.push(message.content[0].text)
        }
        return keynotes;
    }

    combine(slides, notes) {
        let combined = [];

        const maxLength = Math.max(slides.length, notes.length);
    
        for (let i = 0; i < maxLength; i++) {
            combined.push({
                content: slides[i] || '',
                note: notes[i] || ''
            });
        }
    
        return combined;
    }

    async downloadImage(imageUrl, outputPath) {
        try {
          const response = await axios.get(imageUrl, { responseType: 'stream' });
          const writer = fs.createWriteStream(outputPath);
      
          response.data.pipe(writer);
      
          return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });
        } catch (error) {
          console.error('Error downloading the image:', error);
          throw error;
        }
      }

    async generateFile(slides, classData, profileData) {
        const formattingDict = {
            0: [[40, 140], [450, 140]],
            1: [[300, 140], [40, 140]],
          };

        const pptx = new pptxgen();
        pptx.author = profileData.Name;
        pptx.subject = classData.Topic;
        pptx.title = classData.ClassName;
        let i = 0;
        for (const slide of slides) {
            let slideObj;
            if (i === 0)
            {
                slideObj = pptx.addSlide({ masterName: "TITLE_SLIDE" });

                const titleStyle = {
                    x: 0.5,
                    y: 1.25,
                    w: '90%',
                    h: 2,
                    align: 'center',
                    fontSize: 44,
                    fontFace: 'Arial', 
                    bold: true,
                    color: 'FFFFFF', 
                    fill: { color: '0072C6' },
                    margin: 10
                };
            
                slideObj.addText(classData.ClassName, titleStyle);
                slideObj.addNotes(slide.note);

                slideObj.background = { fill: 'D9EAD3' };
            } else {
                let randomIndex = Math.floor(Math.random() * 2);
                let widthHeights = formattingDict[randomIndex];
                slideObj = pptx.addSlide();
                slideObj.addText(slide.content, { x: 0.5, y: 0.5, w: 4, h: 3, fontSize: 18, fontFace: 'Tahoma' });
                slideObj.addNotes(slide.note);

                try {
                    const response = await this.openai.images.generate({
                        model: "dall-e-3",
                        prompt: `Generate a image to be used with this text in a slide: ${slide.content}`,
                        n: 1,
                        size: "1024x1024",
                    });
                    await this.downloadImage(response.data[0].url, `images/img_${i}.png`)
                    slideObj.addImage({ path: `images/img_${i}.png`,  x: 5, y: 0, w: 5, h: 5.63 });
                } catch (err) {
                    console.log(err);
                }
            }
            i++;
          }
          const fileName = `${classData.id}.pptx`;
          pptx.writeFile(`presentations/${fileName}`).then(() => {
            console.log(`Presentation ${fileName} created!`);
          });
    }
}
