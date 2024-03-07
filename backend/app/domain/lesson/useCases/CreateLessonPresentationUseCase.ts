import IUseCase from '../../../core/IUseCase';
import Log from '../../../core/Log';
import ILessonBucket from '../data/ILessonBucket';
import ILessonPresentationData from '../data/ILessonPresentationData';
import { PresentationQueueMessage } from '../data/ILessonQueue';

export default class CreateLessonPresentationUseCase
  implements IUseCase<PresentationQueueMessage, void>
{
  constructor(
    private presentationDataProvider: ILessonPresentationData,
    private bucketDataProvider: ILessonBucket,
  ) {}

  async execute(data: PresentationQueueMessage): Promise<void> {
    const { filePath, lesson, user } = data;

    Log.info(`Start creating presentation for lesson: ${lesson.id}...`);
    Log.info(`Generating slides...`);

    const slides = await this.presentationDataProvider.generateSlides({
      language: user.mainLanguage,
      lesson: {
        id: lesson.id,
        age: lesson.age,
        level: lesson.level,
        tons: lesson.tons,
        topic: lesson.topic,
      },
    });

    Log.info(`Slides created: ${slides}`);
    Log.info(`Generating keynotes...`);

    const keynotes = await this.presentationDataProvider.generateSlideNotes({
      slides,
      lesson: {
        id: lesson.id,
        age: lesson.age,
        level: lesson.level,
      },
      user: {
        dateOfBirth: user.dateOfBirth,
        yearsOfExperience: user.yearsOfExperience,
      },
    });

    Log.info(`Keynotes created: ${keynotes}`);
    Log.info(`Generating presentation file...`);

    const file = await this.presentationDataProvider.generatePresentationFile({
      filePath,
      slides,
      notes: keynotes,
      lesson: {
        id: lesson.id,
        name: lesson.name,
        topic: lesson.topic,
      },
      user: {
        name: user.name,
      },
    });

    Log.info(`File created: ${file}`);
    Log.info(`Saving file to bucket...`);

    await this.bucketDataProvider.saveFile(file);

    Log.info(`Process fishied for lesson: ${lesson.id}!`);
  }
}
