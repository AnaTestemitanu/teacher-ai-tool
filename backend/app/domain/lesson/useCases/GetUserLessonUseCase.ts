import IUseCase from '../../../core/IUseCase';
import UserFactory from '../../user/entities/UserFactory';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';

export default class GetUserLessonUseCase
  implements IUseCase<string, LessonEntity | undefined>
{
  async execute(userId: string): Promise<LessonEntity | undefined> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserById(userId);

    if (!user?.id) throw new Error('User does not exist');

    const lessonFactory = new LessonFactory();
    return lessonFactory.getLessonByUserId(userId);
  }
}
