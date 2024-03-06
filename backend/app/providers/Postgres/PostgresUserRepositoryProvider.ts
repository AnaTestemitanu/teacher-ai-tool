import format from 'pg-format';
import IUserData from '../../domain/user/data/IUserData';
import { UserEntity } from '../../domain/user/entities/UserEntity';
import PostgresBase from './PostgresBase';
import Log from '../../core/Log';

export default class PostgresUserRepositoryProvider
  extends PostgresBase
  implements IUserData
{
  public async create(user: UserEntity): Promise<UserEntity> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `INSERT INTO public.users
        (id, name, email, password, password_salt, years_of_experience, gender, main_language, date_of_birth)
        VALUES
        (%L)
        RETURNING *`,
        [
          user.id,
          this.cleanStringXss(user.name),
          this.cleanStringXss(user.email),
          user.password,
          user.passwordSalt,
          user.yearsOfExperience,
          user.gender,
          user.mainLanguage,
          user.dateOfBirth,
        ],
      );

      const result = await pgClient.query(query);
      const userData = {} as UserEntity;

      if (result?.rows.length > 0) {
        const item = result.rows[0];
        userData.id = item.id;
        userData.name = item.name;
        userData.email = item.email;
        userData.gender = item.gender;
        userData.mainLanguage = item.main_language;
        userData.dateOfBirth = item.date_of_birth;
        userData.password = item.password;
        userData.passwordSalt = item.password_salt;
        userData.yearsOfExperience = item.years_of_experience;
        userData.createdAt = item.created_at;
      }

      return userData;
    } catch (error: any) {
      Log.error(error, { method: 'user-repository.create', data: user });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = `
          SELECT 
            id, name, email, password, password_salt, years_of_experience, 
            gender, main_language, date_of_birth, created_at
          FROM public.users
          ORDER BY created_at desc`;

      const result = await pgClient.query(query);
      const users: UserEntity[] = [];

      if (result?.rows.length > 0) {
        result.rows.forEach(item => {
          users.push({
            id: item.id,
            name: item.name,
            email: item.email,
            password: item.password,
            passwordSalt: item.password_salt,
            yearsOfExperience: item.years_of_experience,
            gender: item.gender,
            mainLanguage: item.main_language,
            dateOfBirth: item.date_of_birth,
            createdAt: item.created_at,
          });
        });
      }

      return users;
    } catch (error: any) {
      Log.error(error, { method: 'user-repository.getAllUsers' });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async getUserById(userId: string): Promise<UserEntity | undefined> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `SELECT 
            id, name, email, password, password_salt, years_of_experience, 
            gender, main_language, date_of_birth, created_at
          FROM public.users
          WHERE id = %L`,
        [userId],
      );

      const result = await pgClient.query(query);

      if (result?.rows.length > 0) {
        const item = result.rows[0];
        const userData = {} as UserEntity;

        userData.id = item.id;
        userData.name = item.name;
        userData.email = item.email;
        userData.gender = item.gender;
        userData.mainLanguage = item.main_language;
        userData.dateOfBirth = item.date_of_birth;
        userData.password = item.password;
        userData.passwordSalt = item.password_salt;
        userData.yearsOfExperience = item.years_of_experience;
        userData.createdAt = item.created_at;

        return userData;
      }

      return undefined;
    } catch (error: any) {
      Log.error(error, { method: 'user-repository.getUserById', data: userId });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `SELECT 
            id, name, email, password, password_salt, years_of_experience, 
            gender, main_language, date_of_birth, created_at
          FROM public.users
          WHERE email = %L`,
        [email],
      );

      const result = await pgClient.query(query);

      if (result?.rows.length > 0) {
        const item = result.rows[0];
        const userData = {} as UserEntity;

        userData.id = item.id;
        userData.name = item.name;
        userData.email = item.email;
        userData.gender = item.gender;
        userData.mainLanguage = item.main_language;
        userData.dateOfBirth = item.date_of_birth;
        userData.password = item.password;
        userData.passwordSalt = item.password_salt;
        userData.yearsOfExperience = item.years_of_experience;
        userData.createdAt = item.created_at;

        return userData;
      }

      return undefined;
    } catch (error: any) {
      Log.error(error, {
        method: 'user-repository.getUserByEmail',
        data: email,
      });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async passwordSaltExists(passwordSalt: string): Promise<boolean> {
    format.config();
    const pgClient = await this.connect();

    try {
      const query = format(
        `SELECT password_salt FROM public.users WHERE password_salt = %L`,
        [passwordSalt],
      );

      const result = await pgClient.query(query);

      if (result?.rows.length > 0) {
        return true;
      }

      return false;
    } catch (error: any) {
      Log.error(error, {
        method: 'user-repository.passwordSaltExists',
        data: passwordSalt,
      });
      throw error;
    } finally {
      pgClient.release();
    }
  }

  public async delete(userId: string): Promise<boolean> {
    format.config();
    const pgClient = await this.connect();

    try {
      await pgClient.query(
        format(`DELETE FROM public.users WHERE id = %L`, userId),
      );

      return true;
    } catch (error: any) {
      Log.error(error, {
        method: 'user-repository.delete',
        data: userId,
      });
      throw error;
    } finally {
      pgClient.release();
    }
  }
}
