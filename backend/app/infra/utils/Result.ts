export default class Result {
  private statusCode: number;

  private data?: any;

  constructor(statusCode: number, data?: any) {
    this.statusCode = statusCode;
    this.data = data;
  }

  bodyToString() {
    return {
      statusCode: this.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: this.data ? JSON.stringify(this.data) : undefined,
    };
  }
}
