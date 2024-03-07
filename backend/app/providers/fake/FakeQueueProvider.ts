import { ILessonQueue } from '../../domain/lesson/data/ILessonQueue';

export default class FakeQueueProvider implements ILessonQueue {
  public async sendPresentationToQueue(): Promise<void> {}
}
