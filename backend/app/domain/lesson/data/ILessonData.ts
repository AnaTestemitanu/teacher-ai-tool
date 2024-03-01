import { LessonEntity } from '../entities/LessonEntity';

export default interface ILessonData {
  create(lesson: LessonEntity): Promise<LessonEntity>;
  getLessonByUserId(userId: string): Promise<LessonEntity | undefined>;
}
