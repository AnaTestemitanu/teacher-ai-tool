import IUseCase from '../../../core/IUseCase';
import UserFactory from '../entities/UserFactory';

export default class DeleteUserUseCase implements IUseCase<string, boolean> {
  async execute(userId: string): Promise<boolean> {
    const userFactory = new UserFactory();
    return userFactory.delete(userId);
  }
}
