import FakeLessonDataProvider from '../../../providers/Fake/FakeLessonDataProvider';
import PostgresLessonRepositoryProvider from '../../../providers/Postgres/PostgresLessonRepositoryProvider';
import Lesson from './Lesson';

export default class LessonFactory extends Lesson {
  constructor() {
    super(
      process.env.ENV_NAME === 'test'
        ? FakeLessonDataProvider.getInstance()
        : new PostgresLessonRepositoryProvider(),
    );
  }
}
