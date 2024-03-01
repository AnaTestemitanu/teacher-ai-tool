import IUserData from '../../domain/user/data/IUserData';
import { UserEntity } from '../../domain/user/entities/UserEntity';

export default class FakeUserDataProviderSingleton implements IUserData {
  private users: UserEntity[] = [];

  private static instance: FakeUserDataProviderSingleton;

  private constructor() {}

  public static getInstance(): FakeUserDataProviderSingleton {
    if (!this.instance) {
      this.instance = new FakeUserDataProviderSingleton();
    }
    return this.instance;
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.users;
  }

  public async getUserById(userId: string): Promise<UserEntity | undefined> {
    return this.users.find(user => user.id === userId);
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async passwordSaltExists(passwordSalt: string): Promise<boolean> {
    const userIndex = this.users.findIndex(
      user => user.passwordSalt === passwordSalt,
    );
    return userIndex !== -1;
  }

  public async delete(userId: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }

    return false;
  }
}
