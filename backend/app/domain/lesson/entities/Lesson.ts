import ILessonData, { CreateLessonDTO } from '../data/ILessonData';
import { LessonEntity } from './LessonEntity';

export default abstract class Lesson implements ILessonData {
  constructor(private lessonDataProvider: ILessonData) {}

  public async create(data: CreateLessonDTO): Promise<LessonEntity> {
    return this.lessonDataProvider.create(data);
  }

  public async getLessonByUserId(
    userId: string,
  ): Promise<LessonEntity | undefined> {
    return this.lessonDataProvider.getLessonByUserId(userId);
  }
}
