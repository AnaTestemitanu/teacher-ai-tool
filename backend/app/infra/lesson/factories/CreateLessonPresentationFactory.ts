import CreateLessonPresentationUseCase from '../../../domain/lesson/useCases/CreateLessonPresentationUseCase';
import FakePresentationDataProvider from '../../../providers/Fake/FakePresentationDataProvider';
import LessonPresentationFactory from '../../../providers/Presentation/LessonPresentationFactory';
import S3BucketProvider from '../../../providers/AWS/S3/S3BucketProvider';

export default class CreateLessonPresentationFactory extends CreateLessonPresentationUseCase {
  constructor() {
    super(
      process.env.ENV_NAME === 'test'
        ? new FakePresentationDataProvider()
        : new LessonPresentationFactory(),
      new S3BucketProvider(),
    );
  }
}
