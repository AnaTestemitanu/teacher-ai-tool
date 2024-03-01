import { v4 as uuidV4 } from 'uuid';
import ILessonData from '../data/ILessonData';
import { LessonEntity } from './LessonEntity';

export type CreateLessonDTO = Omit<LessonEntity, 'id'>;

export default abstract class Lesson {
  constructor(private lessonDataProvider: ILessonData) {}

  public async create(data: CreateLessonDTO): Promise<LessonEntity> {
    return this.lessonDataProvider.create({
      id: uuidV4(),
      ...data,
    });
  }

  public async getLessonByUserId(
    userId: string,
  ): Promise<LessonEntity | undefined> {
    return this.lessonDataProvider.getLessonByUserId(userId);
  }
}
