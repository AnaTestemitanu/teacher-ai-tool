import { LessonEntity } from '../entities/LessonEntity';

export type CreateLessonDTO = {
  userId: string;
  className: string;
  classAge: number;
  classLevel: string;
  classGroupName: string;
  topic: string;
  tons?: string;
  pdfLink?: string;
  pdfPages: string;
};

export default interface ILessonData {
  create(data: CreateLessonDTO): Promise<LessonEntity>;
  getLessonByUserId(userId: string): Promise<LessonEntity | undefined>;
}
