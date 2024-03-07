import { Handler } from 'aws-lambda';
import LessonController from '../controllers/LessonController';
import { MessageUtil } from '../../utils/MessageUtil';
import Log from '../../../core/Log';
import { PresentationQueueMessage } from '../../../domain/lesson/data/ILessonQueue';

export const createLessonPresentation: Handler = async (
  event: any,
  context: any,
  callback: any,
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const presentationQueueData: PresentationQueueMessage[] = [];

  event.Records.forEach((record: any) => {
    presentationQueueData.push(JSON.parse(record.body));
  });

  try {
    const lessonController = new LessonController();

    await Promise.all(
      presentationQueueData.map(async presentationData => {
        await lessonController.createLessonPresentation(presentationData);
      }),
    );

    callback(null, MessageUtil.success());
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(400, err.message));
  }
};
