import { Handler } from 'aws-lambda';
import Joi from 'joi';
import UserController from '../controllers/UserController';
import { MessageUtil } from '../../utils/MessageUtil';
import { isValidToken } from '../../middlewares/auth';
import Log from '../../../core/Log';

export const createUser: Handler = async (
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
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(8)
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,}$/)
        .messages({
          'string.min': 'Password must be at least 8 characters long',
          'string.pattern.base':
            'Password must contain at least one uppercase letter, one number, and one special character',
        }),
      dateOfBirth: Joi.string()
        .required()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
          'string.pattern.base':
            'Date of birth must be in the format YYYY-MM-DD',
          'string.isoDate': 'Date of birth must be a valid ISO date',
        }),
      yearsOfExperience: Joi.number().required(),
      gender: Joi.string().valid('MALE', 'FEMALE', 'NON-BINARY').required(),
      mainLanguage: Joi.string().required(),
    });

    const { error } = schema.validate(formattedBody);

    if (error) {
      callback(null, MessageUtil.error(400, error.details));
      return;
    }

    const UuerController = new UserController();
    const response = await UuerController.create(formattedBody);
    callback(null, MessageUtil.success(response));
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(400, err.message));
  }
};
