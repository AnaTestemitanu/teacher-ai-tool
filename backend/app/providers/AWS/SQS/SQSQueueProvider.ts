import AWS from 'aws-sdk';
import {
  ILessonQueue,
  PresentationQueueMessage,
} from '../../../domain/lesson/data/ILessonQueue';
import Log from '../../../core/Log';

export default class SQSQueueProvider implements ILessonQueue {
  protected sqs: AWS.SQS;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  }

  public async sendPresentationToQueue(
    data: PresentationQueueMessage,
  ): Promise<void> {
    try {
      await this.sqs
        .sendMessage({
          MessageBody: JSON.stringify(data),
          QueueUrl: String(process.env.PRESENTATION_QUEUE_INFO),
        })
        .promise();
    } catch (err: any) {
      Log.error(err, {
        key: 'sendPresentationToQueue',
        data,
      });
    }
  }
}
