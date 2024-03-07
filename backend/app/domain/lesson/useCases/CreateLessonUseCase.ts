import path from 'path';
import IUseCase from '../../../core/IUseCase';
import UserFactory from '../../user/entities/UserFactory';
import { CreateLessonDTO } from '../entities/Lesson';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';
import { ILessonQueue } from '../data/ILessonQueue';

export default abstract class CreateLessonUseCase
  implements IUseCase<CreateLessonDTO, LessonEntity>
{
  constructor(private presentationQueueProvider: ILessonQueue) {}

  async execute(data: CreateLessonDTO): Promise<LessonEntity> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserById(data.userId);

    if (!user?.id) throw new Error('User does not exist');

    const lessonFactory = new LessonFactory();
    const lessonData = await lessonFactory.create(data);

    await this.presentationQueueProvider.sendPresentationToQueue({
      filePath: path.resolve(__dirname, '..', '..', '..', '..', 'assets'),
      user,
      lesson: lessonData,
    });

    return lessonData;
  }
}
