import { Handler } from 'aws-lambda';
import Joi from 'joi';
import UserController from '../controllers/UserController';
import { MessageUtil } from '../../utils/MessageUtil';
import { isValidToken } from '../../middlewares/auth';
import Log from '../../../core/Log';

export const validateUserCredentials: Handler = async (
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

    let formattedBody;

    if (event.body) {
      formattedBody = JSON.parse(event.body);
    }

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(formattedBody);

    if (error) {
      callback(null, MessageUtil.error(400, error.details));
      return;
    }

    const userController = new UserController();

    const response = await userController.validateLogin({
      email: formattedBody.email,
      password: formattedBody.password,
    });

    callback(null, MessageUtil.success(response));
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(401, 'Unauthorized'));
  }
};
