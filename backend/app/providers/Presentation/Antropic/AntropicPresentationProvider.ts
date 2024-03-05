import Anthropic from '@anthropic-ai/sdk';

import LessonPresentation from '../LessonPresentation';
import {
  GeneratePresentationFileDTO,
  GenerateSlidesDTO,
  GenerateSlidesNotesDTO,
} from '../../../domain/lesson/data/ILessonPresentationData';
import Log from '../../../core/Log';

export default class AntropicPresentationProvider extends LessonPresentation {
  private anthropic: Anthropic;

  constructor() {
    super();
    this.anthropic = new Anthropic({
      apiKey:
        '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',
    });
  }

  public async generateSlides(data: GenerateSlidesDTO): Promise<string[]> {
    const { language, lesson } = data;
    const lessonLevel = lesson.level;
    const lessonAge = lesson.age;
    const tone = this.getTone(data.lesson.tons);
    const text = this.getText(lesson.topic);

    Log.info(`Starting slide creation for lesson: ${lesson.id}...`);

    const message = await this.anthropic.messages.create({
      model: 'claude-2.1',
      max_tokens: 1000,
      temperature: 0,
      system: `You are an expert in summarising text-book content into a format which can be inputted into a PowerPoint in ${language}.\n\
        You will be tasked with splitting a large chunk of text into separate slides to build a narrative which will support students in learning the content.\n\
        These slides should start with a title slide and each slide should be separated by XML tags which are labelled with <slide></slide>. \
        You should prioritise all of the important content being included, over reducing the number of slides\
        You should not introduce or conclude the slides, just output them.`,
      messages: [
        {
          role: 'user',
          content: `${text} Please start by reading and understanding this text. \
            Turn this text into content for slides suitable for a class of ${lessonLevel} ${lessonAge}-year-olds.\
            Ensure that no valuable content has been missed out.\
            Have each slide cover a certain theme to build a narrative over the slides making the content easier to understand and digest.\
            ${tone}`,
        },
      ],
    });

    const response = message.content[0].text;
    const formattedResponse = response
      .split(/<\/?slide>/)
      .filter((text: string) => text.trim() !== '');

    Log.info(`Slide created! Response: ${formattedResponse}`);

    return formattedResponse;
  }

  public async generateSlideNotes(
    data: GenerateSlidesNotesDTO,
  ): Promise<string[]> {
    const { lesson, slides, user } = data;
    const { age } = lesson;
    const yoe = user.yearsOfExperience;
    const lessonLevel = lesson.level;
    const lessonAge = lesson.age;
    const notes: string[] = [];

    await Promise.all(
      slides.map(async slide => {
        Log.info(
          `Starting note creation on slide ${slide} for lesson: ${lesson.id}...`,
        );

        const message = await this.anthropic.messages.create({
          model: 'claude-2.1',
          max_tokens: 1000,
          temperature: 0,
          system: `You are an expert in creating helpful summaries of the content in a presentation's slide.\
            You should design these summaries to support a teacher in delivering the slide content.\
            Do not include XML tags`,
          messages: [
            {
              role: 'user',
              content: `${slide} Please understand the content in this slide.\
                Create a set of notes for a ${age}-year-old teacher with ${yoe} years of experience.\
                These notes should help the teacher communicate the content of the slide more effectively to a class of ${lessonLevel} with ${lessonAge}-year-old's students.\
                The notes can also include relevant exercises for students to complete.\
                Skip the preamble.`,
            },
          ],
        });

        Log.info(`Note created: ${message.content[0].text}...`);
        notes.push(message.content[0].text);
      }),
    );

    return notes;
  }

  public generatePresentationFile(
    _data: GeneratePresentationFileDTO,
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
