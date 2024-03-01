import IUseCase from '../../../core/IUseCase';
import { UserEntity } from '../entities/UserEntity';
import UserFactory from '../entities/UserFactory';

export type GetUserByIdResponse = Omit<UserEntity, 'password' | 'passwordSalt'>;

export default class GetUserByIdUseCase
  implements IUseCase<string, GetUserByIdResponse | undefined>
{
  async execute(userId: string): Promise<GetUserByIdResponse | undefined> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserById(userId);

    if (!user?.id) return undefined;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      mainLanguage: user.mainLanguage,
      yearsOfExperience: user.yearsOfExperience,
    };
  }
}
