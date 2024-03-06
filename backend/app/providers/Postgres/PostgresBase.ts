import { Pool, PoolClient } from 'pg';
import xss from 'xss';
import Log from '../../core/Log';

export default abstract class PostgresBase {
  protected connection: Pool;

  constructor() {
    const conf: any = {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '12345678',
      database: 'teacher-ai',
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

  protected trimText(data: string | undefined): string | undefined {
    if (typeof data === 'string') {
      return data.substring(0, 7500);
    }
    return data;
  }
}
