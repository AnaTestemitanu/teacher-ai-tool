import { Pool, PoolClient } from 'pg';
import xss from 'xss';
import Log from '../../core/Log';

export default abstract class PostgresBase {
  protected connection: Pool;

  constructor() {
    const conf: any = {
      host: process.env.PS_HOST,
      port: Number(process.env.PS_PORT),
      user: process.env.PS_USER,
      password: process.env.PS_PASSWORD,
      database: process.env.PS_DATABASE,
      allowExitOnIdle: true,
      idle_in_transaction_session_timeout: 1,
      idleTimeoutMillis: 1000,
    };

    this.connection = new Pool(conf);
  }

  protected async connect(): Promise<PoolClient> {
    try {
      return this.connection.connect();
    } catch (err: any) {
      Log.error(err);
      throw new Error('Internal Server Error');
    }
  }

  protected cleanStringXss(data: string | undefined): string | undefined {
    if (typeof data === 'string') {
      return xss(
        data
          .replace(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/g, '')
          .replace(/javascript:/g, '')
          .replace('s3.amazonaws.com@', 's3.amazonaws.com'),
      );
    }
    return data;
  }
}
