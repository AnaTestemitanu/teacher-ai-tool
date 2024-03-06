import format from 'pg-format';
import ILessonData from '../../domain/lesson/data/ILessonData';
import PostgresBase from './PostgresBase';
import { LessonEntity } from '../../domain/lesson/entities/LessonEntity';
import Log from '../../core/Log';

export default class PostgresLessonRepositoryProvider
  extends PostgresBase
  implements ILessonData
{
  public async create(lesson: LessonEntity): Promise<LessonEntity> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `INSERT INTO public.lessons
        (id, user_id, name, age, group_name, topic, tons, pdf_link, pdf_pages, level)
        VALUES
        (%L)
        RETURNING *`,
        [
          lesson.id,
          lesson.userId,
          this.cleanStringXss(lesson.name),
          lesson.age,
          this.cleanStringXss(lesson.groupName),
          this.cleanStringXss(lesson.topic),
          this.cleanStringXss(lesson.tons),
          lesson.pdfLink ? this.cleanStringXss(lesson.pdfLink) : undefined,
          lesson.pdfPages ? this.cleanStringXss(lesson.pdfPages) : undefined,
          lesson.level,
        ],
      );

      const result = await pgClient.query(query);
      const lessonData = {} as LessonEntity;

      if (result?.rows.length > 0) {
        const item = result.rows[0];
        lessonData.id = item.id;
        lessonData.userId = item.user_id;
        lessonData.name = item.name;
        lessonData.age = item.name;
        lessonData.level = item.level;
        lessonData.groupName = item.group_name;
        lessonData.topic = item.topic;
        lessonData.tons = item.tons;
        lessonData.pdfLink = item.pdf_link ? item.pdf_link : undefined;
        lessonData.pdfPages = item.pdf_pages ? item.pdf_pages : undefined;
        lessonData.createdAt = item.created_at;
      }

      return lessonData;
    } catch (error: any) {
      Log.error(error, { method: 'lesson-repository.create', data: lesson });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async getLessonByUserId(
    userId: string,
  ): Promise<LessonEntity | undefined> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `SELECT 
            id, user_id, name, age, group_name, topic, tons, pdf_link, pdf_pages, level, created_at
          FROM public.lessons
          WHERE user_id = %L`,
        [userId],
      );

      const result = await pgClient.query(query);

      if (result?.rows.length > 0) {
        const item = result.rows[0];

        const lessonData = {} as LessonEntity;
        lessonData.id = item.id;
        lessonData.userId = item.user_id;
        lessonData.name = item.name;
        lessonData.age = item.name;
        lessonData.level = item.level;
        lessonData.groupName = item.group_name;
        lessonData.topic = item.topic;
        lessonData.tons = item.tons;
        lessonData.pdfLink = item.pdf_link ? item.pdf_link : undefined;
        lessonData.pdfPages = item.pdf_pages ? item.pdf_pages : undefined;
        lessonData.createdAt = item.created_at;

        return lessonData;
      }

      return undefined;
    } catch (error: any) {
      Log.error(error, {
        method: 'lesson-repository.getLessonByUserId',
        data: userId,
      });
      throw error;
    } finally {
      pgClient.release();
    }
  }
}
