export default class Log {
  public static info(message: any) {
    if (process.env.ENV_NAME !== 'test') {
      console.log(message);
    }
  }

  public static error(err: Error, inputData = {}) {
    if (process.env.ENV_NAME !== 'test') {
      console.error(
        err,
        Object.keys(inputData).length > 0 ? JSON.stringify(inputData) : null,
      );
    }
  }
}
