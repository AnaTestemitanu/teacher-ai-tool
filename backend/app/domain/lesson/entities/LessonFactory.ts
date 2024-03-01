import FakeLessonDataProvider from '../../../providers/Fake/FakeLessonDataProvider';
import Lesson from './Lesson';

export default class LessonFactory extends Lesson {
  constructor() {
    super(
      process.env.ENV_NAME !== 'test'
        ? FakeLessonDataProvider.getInstance()
        : FakeLessonDataProvider.getInstance(),
    );
  }
}
