import Pptxgen from 'pptxgenjs';
import OpenAI from 'openai';
import {
  GeneratePresentationFileDTO,
  GenerateSlidesDTO,
  GenerateSlidesNotesDTO,
} from '../../../domain/lesson/data/ILessonPresentationData';
import LessonPresentation from '../LessonPresentation';
import Log from '../../../core/Log';

export default class OpenAIPresentationProvider extends LessonPresentation {
  private openai: OpenAI;

  constructor() {
    super();
    this.openai = new OpenAI({
      apiKey: String(process.env.OPEN_AI_API_KEY),
    });
  }

  public generateSlides(_data: GenerateSlidesDTO): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  public generateSlideNotes(_data: GenerateSlidesNotesDTO): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  public async generatePresentationFile(
    data: GeneratePresentationFileDTO,
  ): Promise<string> {
    const { filePath, lesson, notes, slides, user } = data;
    const formattedSlides = this.combine(slides, notes);

    const pptx = new Pptxgen();
    pptx.author = user.name;
    pptx.subject = lesson.topic;
    pptx.title = lesson.name;

    await Promise.all(
      formattedSlides.map(async (slide, index) => {
        let slideObj;

        Log.info(
          `Staring slide file generation for ${slide}, index: ${index}...`,
        );

        if (index === 0) {
          slideObj = pptx.addSlide({ masterName: 'TITLE_SLIDE' });
          slideObj.addText(lesson.name, {
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
            margin: 10,
          });

          slideObj.addNotes(slide.note);
          slideObj.background = { fill: 'D9EAD3' };
        } else {
          slideObj = pptx.addSlide();
          slideObj.addText(slide.content, {
            x: 0.5,
            y: 0.5,
            w: 4,
            h: 3,
            fontSize: 18,
            fontFace: 'Tahoma',
          });
          slideObj.addNotes(slide.note);

          const response = await this.openai.images.generate({
            model: 'dall-e-3',
            prompt: `Generate a image to be used with this text in a slide: ${slide.content}`,
            n: 1,
            size: '1024x1024',
          });

          Log.info(
            `Starting the image download. URL: ${response.data[0].url}, saving on images/img_${index}.png`,
          );

          const image = `${filePath}/images/img_${index}.png`;
          await this.downloadImage(String(response.data[0].url), image);

          slideObj.addImage({
            path: image,
            x: 5,
            y: 0,
            w: 5,
            h: 5.63,
          });
        }
      }),
    );

    const fileName = `${lesson.id}.pptx`;
    await pptx.writeFile({ fileName: `${filePath}/presentations/${fileName}` });

    return fileName;
  }
}
