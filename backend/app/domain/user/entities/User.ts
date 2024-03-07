import { v4 as uuidV4 } from 'uuid';
import IUserData from '../data/IUserData';
import { UserEntity } from './UserEntity';
import { ICryptoData } from '../../../core/ICryptoData';

export type CreateUserDTO = Omit<UserEntity, 'id' | 'passwordSalt'>;

type PasswordValidationResponse = {
  valid: boolean;
  error?: string;
};

export default abstract class User {
  constructor(
    private userDataProvider: IUserData,
    private criptoProvider: ICryptoData,
  ) {}

  public async create(data: CreateUserDTO): Promise<UserEntity> {
    const emailAlreadyExists = await this.getUserByEmail(data.email);

    if (emailAlreadyExists?.email) {
      throw new Error('This user aready exists');
    }

    const { valid, error } = this.isValidPassword(data.password);
    if (!valid) throw new Error(error);

    if (!this.isValidDateOfBirth(data.dateOfBirth)) {
      throw new Error('Date of birth must be in the format YYYY-MM-DD');
    }

    const passwordSalt = await this.gerenatePasswordSalt();
    const encryptedPassword = await this.criptoProvider.encrypt(
      data.password,
      passwordSalt,
    );

    return this.userDataProvider.create({
      ...data,
      id: uuidV4(),
      password: encryptedPassword,
      passwordSalt,
    });
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.userDataProvider.getAllUsers();
  }

  public async getUserById(userId: string): Promise<UserEntity | undefined> {
    return this.userDataProvider.getUserById(userId);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userDataProvider.getUserByEmail(email);
  }

  public async delete(userId: string): Promise<boolean> {
    const userExists = await this.getUserById(userId);

    if (!userExists?.id) {
      throw new Error('User does not exist');
    }

    return this.userDataProvider.delete(userId);
  }

  public async isValidUserCredentials(
    email: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user?.id) return false;

    const encryptedPassword = await this.criptoProvider.encrypt(
      password,
      user.passwordSalt,
    );

    return encryptedPassword === user.password;
  }

  private async gerenatePasswordSalt(): Promise<string> {
    let passwordSalt = '';
    let passwordSaltExists = false;

    do {
      passwordSalt = await this.criptoProvider.generateSecretKey();
      passwordSaltExists = await this.userDataProvider.passwordSaltExists(
        passwordSalt,
      );
    } while (passwordSaltExists);

    return passwordSalt;
  }

  private isValidPassword(password: string): PasswordValidationResponse {
    if (password.length < 8) {
      return {
        valid: false,
        error: 'Password must be at least 8 characters long',
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one uppercase letter',
      };
    }

    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one number',
      };
    }

    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
      return {
        valid: false,
        error: 'Password must contain at least one special character',
      };
    }

    return { valid: true };
  }

  private isValidDateOfBirth(dateOfBirth: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) return false;
    return true;
  }
}
