import { Handler } from 'aws-lambda';
import LessonController from '../controllers/LessonController';
import { MessageUtil } from '../../utils/MessageUtil';
import { isValidToken } from '../../middlewares/auth';
import Log from '../../../core/Log';

export const getUserLesson: Handler = async (
  event: any,
  context: any,
  callback: any,
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!event?.headers?.Authorization) {
      callback(null, MessageUtil.error(401, 'Unauthorized'));
      return;
    }

    const { Authorization: apiKey } = event.headers;
    const token = apiKey.replace('Bearer ', '');

    if (!isValidToken(token)) {
      callback(null, MessageUtil.error(401, 'Unauthorized'));
      return;
    }

    if (!event.pathParameters?.userId) {
      callback(null, MessageUtil.error(401, 'Unauthorized'));
    }

    const lessonController = new LessonController();
    const response = await lessonController.getUserLesson(
      event.pathParameters?.userId,
    );

    if (response?.id) {
      callback(null, MessageUtil.success(response));
      return;
    }

    callback(null, MessageUtil.error(400, 'Not found'));
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(400, err.message));
  }
};
