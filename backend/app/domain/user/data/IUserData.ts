import { UserEntity } from '../entities/UserEntity';

export default interface IUserData {
  create(user: UserEntity): Promise<UserEntity>;
  getAllUsers(): Promise<UserEntity[]>;
  getUserById(userId: string): Promise<UserEntity | undefined>;
  getUserByEmail(email: string): Promise<UserEntity | undefined>;
  passwordSaltExists(salt: string): Promise<boolean>;
  delete(userId: string): Promise<boolean>;
}
