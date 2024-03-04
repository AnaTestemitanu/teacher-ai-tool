import IUseCase from '../../../core/IUseCase';
import UserFactory from '../../user/entities/UserFactory';
import ILessonPresentationData from '../data/ILessonPresentationData';
import { CreateLessonDTO } from '../entities/Lesson';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';

export type CreateLessonUseCaseDTO = {
  userId: string;
  lesson: CreateLessonDTO;
};

export default class CreateLessonUseCase
  implements IUseCase<CreateLessonUseCaseDTO, LessonEntity>
{
  constructor(private presentationDataProvider: ILessonPresentationData) {}

  async execute({
    userId,
    lesson,
  }: CreateLessonUseCaseDTO): Promise<LessonEntity> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserById(userId);

    if (!user?.id) throw new Error('User does not exist');

    const lessonFactory = new LessonFactory();
    const lessonData = await lessonFactory.create(lesson);

    const slides = await this.presentationDataProvider.generateSlides({
      language: user.mainLanguage,
      lesson: {
        age: lessonData.age,
        level: lessonData.level,
        tons: lessonData.tons,
      },
    });

    const keynotes = await this.presentationDataProvider.generateSlideNotes({
      slides,
      language: user.mainLanguage,
      lesson: {
        age: lessonData.age,
        level: lessonData.level,
      },
      user: {
        dateOfBirth: user.dateOfBirth,
        yearsOfExperience: user.yearsOfExperience,
      },
    });

    await this.presentationDataProvider.generatePresentationFile({
      slides,
      notes: keynotes,
      lesson: {
        name: lesson.name,
        topic: lesson.topic,
      },
      user: {
        name: user.name,
      },
    });

    return lessonData;
  }
}
