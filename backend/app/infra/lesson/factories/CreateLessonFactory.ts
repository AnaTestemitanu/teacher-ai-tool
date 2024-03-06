import CreateLessonUseCase from '../../../domain/lesson/useCases/CreateLessonUseCase';
import FakePresentationDataProvider from '../../../providers/Fake/FakePresentationDataProvider';
import LessonPresentationFactory from '../../../providers/Presentation/LessonPresentationFactory';
import S3BucketProvider from '../../../providers/S3/S3BucketProvider';

export default class CreateLessonFactory extends CreateLessonUseCase {
  constructor() {
    super(
      process.env.ENV_NAME === 'test'
        ? new FakePresentationDataProvider()
        : new LessonPresentationFactory(),
      new S3BucketProvider(),
    );
  }
}
