import { Handler } from 'aws-lambda';
import Joi from 'joi';
import LessonController from '../controllers/LessonController';
import { MessageUtil } from '../../utils/MessageUtil';
import { isValidToken } from '../../middlewares/auth';
import Log from '../../../core/Log';

export const createLesson: Handler = async (
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
      userId: Joi.string()
        .required()
        .guid({
          version: ['uuidv1', 'uuidv4', 'uuidv5'],
        }),
      name: Joi.string().required(),
      age: Joi.number().required(),
      level: Joi.string().valid('LOWER', 'MEDIUM', 'HIGH').required(),
      groupName: Joi.string().required(),
      topic: Joi.string().required(),
      tons: Joi.string().required(),
      pdfLink: Joi.string().allow('', null),
      pdfPages: Joi.string().required(),
    });

    const { error } = schema.validate(formattedBody);

    if (error) {
      callback(null, MessageUtil.error(400, error.details));
      return;
    }

    const lessonController = new LessonController();
    const response = await lessonController.create(formattedBody);
    callback(null, MessageUtil.success(response));
  } catch (err: any) {
    Log.error(err);
    callback(null, MessageUtil.error(400, err.message));
  }
};
