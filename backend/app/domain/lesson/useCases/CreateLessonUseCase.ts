import path from 'path';
import IUseCase from '../../../core/IUseCase';
import Log from '../../../core/Log';
import UserFactory from '../../user/entities/UserFactory';
import ILessonBucket from '../data/ILessonBucket';
import ILessonPresentationData from '../data/ILessonPresentationData';
import { CreateLessonDTO } from '../entities/Lesson';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';

export default abstract class CreateLessonUseCase
  implements IUseCase<CreateLessonDTO, LessonEntity>
{
  constructor(
    private presentationDataProvider: ILessonPresentationData,
    private bucketDataProvider: ILessonBucket,
  ) {}

  async execute(data: CreateLessonDTO): Promise<LessonEntity> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserById(data.userId);

    if (!user?.id) throw new Error('User does not exist');

    const lessonFactory = new LessonFactory();
    const lessonData = await lessonFactory.create(data);

    const slides = await this.presentationDataProvider.generateSlides({
      language: user.mainLanguage,
      lesson: {
        id: lessonData.id,
        age: lessonData.age,
        level: lessonData.level,
        tons: lessonData.tons,
        topic: lessonData.topic,
      },
    });

    Log.info(`Slides created: ${slides}`);

    const keynotes = await this.presentationDataProvider.generateSlideNotes({
      slides,
      lesson: {
        id: lessonData.id,
        age: lessonData.age,
        level: lessonData.level,
      },
      user: {
        dateOfBirth: user.dateOfBirth,
        yearsOfExperience: user.yearsOfExperience,
      },
    });

    Log.info(`Keynotes created: ${keynotes}`);

    const file = await this.presentationDataProvider.generatePresentationFile({
      filePath: path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
      slides,
      notes: keynotes,
      lesson: {
        id: lessonData.id,
        name: lessonData.name,
        topic: lessonData.topic,
      },
      user: {
        name: user.name,
      },
    });

    Log.info(`File created: ${file}`);

    await this.bucketDataProvider.saveFile(file);

    return lessonData;
  }
}
