import IUseCase from '../../../core/IUseCase';
import { UserEntity } from '../entities/UserEntity';
import UserFactory from '../entities/UserFactory';

export type GetAllUsersResponse = Omit<UserEntity, 'password' | 'passwordSalt'>;

export default class GetAllUsersUseCase
  implements IUseCase<void, GetAllUsersResponse[]>
{
  async execute(): Promise<GetAllUsersResponse[]> {
    const userFactory = new UserFactory();
    const users = await userFactory.getAllUsers();

    if (users.length > 0) {
      return users.map(user => {
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
      });
    }

    return [] as GetAllUsersResponse[];
  }
}
