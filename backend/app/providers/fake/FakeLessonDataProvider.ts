import ILessonData from '../../domain/lesson/data/ILessonData';
import { LessonEntity } from '../../domain/lesson/entities/LessonEntity';

export default class FakeLessonDataProviderSingleton implements ILessonData {
  private lessons: LessonEntity[] = [];

  private static instance: FakeLessonDataProviderSingleton;

  private constructor() {}

  public static getInstance(): FakeLessonDataProviderSingleton {
    if (!this.instance) {
      this.instance = new FakeLessonDataProviderSingleton();
    }
    return this.instance;
  }

  async create(lesson: LessonEntity): Promise<LessonEntity> {
    this.lessons.push(lesson);
    return lesson;
  }

  async getLessonByUserId(userId: string): Promise<LessonEntity | undefined> {
    return this.lessons.find(lesson => lesson.userId === userId);
  }
}
