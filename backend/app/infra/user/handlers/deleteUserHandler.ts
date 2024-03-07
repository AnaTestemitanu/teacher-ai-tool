import { Handler } from 'aws-lambda';
import UserController from '../controllers/UserController';
import { MessageUtil } from '../../utils/MessageUtil';
import { isValidToken } from '../../middlewares/auth';
import Log from '../../../core/Log';

export const deleteUser: Handler = async (
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

    const userController = new UserController();
    const response = await userController.delete(event.pathParameters?.userId);
    callback(null, MessageUtil.success(response));
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(400, err.message));
  }
};
