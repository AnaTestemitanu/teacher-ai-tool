import { ResponseVO } from '../vo/ResponseVO';
import Result from './Result';

enum StatusCode {
  success = 200,
  noBodySucess = 201,
}

export class MessageUtil {
  static success(data?: any): ResponseVO {
    const result = new Result(StatusCode.success, data);
    return result.bodyToString();
  }

  static noBodySucess(data?: any): ResponseVO {
    const result = new Result(StatusCode.noBodySucess, data);
    return result.bodyToString();
  }

  static error(code = 400, message: any) {
    const result = new Result(code, message);
    return result.bodyToString();
  }
}
