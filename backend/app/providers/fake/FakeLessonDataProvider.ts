import { v4 as uuidV4 } from 'uuid';
import ILessonData, {
  CreateLessonDTO,
} from '../../domain/lesson/data/ILessonData';
import { LessonEntity } from '../../domain/lesson/entities/LessonEntity';

export default class FakeLessonDataProvider implements ILessonData {
  private lessons: LessonEntity[] = [];

  async create(data: CreateLessonDTO): Promise<LessonEntity> {
    const lesson: LessonEntity = {
      id: uuidV4(),
      ...data,
    };

    this.lessons.push(lesson);
    return lesson;
  }

  async getLessonByUserId(userId: string): Promise<LessonEntity | undefined> {
    return this.lessons.find(lesson => lesson.userId === userId);
  }
}
