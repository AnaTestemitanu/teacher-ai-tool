import IUseCase from '../../../core/IUseCase';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';

export default class GetUserLessonUseCase
  implements IUseCase<string, LessonEntity | undefined>
{
  async execute(userId: string): Promise<LessonEntity | undefined> {
    const lessonFactory = new LessonFactory();
    return lessonFactory.getLessonByUserId(userId);
  }
}
