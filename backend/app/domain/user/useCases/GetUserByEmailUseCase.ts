import IUseCase from '../../../core/IUseCase';
import { UserEntity } from '../entities/UserEntity';
import UserFactory from '../entities/UserFactory';

export type GetUserByEmailResponse = Omit<
  UserEntity,
  'password' | 'passwordSalt'
>;

export default class GetUserByEmailUseCase
  implements IUseCase<string, GetUserByEmailResponse | undefined>
{
  async execute(email: string): Promise<GetUserByEmailResponse | undefined> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserByEmail(email);

    if (!user?.id) return undefined;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      mainLanguage: user.mainLanguage,
      yearsOfExperience: user.yearsOfExperience,
      createdAt: user.createdAt ? user.createdAt : undefined,
    };
  }
}
