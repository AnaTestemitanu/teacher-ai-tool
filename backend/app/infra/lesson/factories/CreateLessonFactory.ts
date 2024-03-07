import CreateLessonUseCase from '../../../domain/lesson/useCases/CreateLessonUseCase';
import SQSQueueProvider from '../../../providers/AWS/SQS/SQSQueueProvider';
import FakeQueueProvider from '../../../providers/Fake/FakeQueueProvider';

export default class CreateLessonFactory extends CreateLessonUseCase {
  constructor() {
    super(
      process.env.ENV_NAME === 'test'
        ? new FakeQueueProvider()
        : new SQSQueueProvider(),
    );
  }
}
