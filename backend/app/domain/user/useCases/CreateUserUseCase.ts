import IUseCase from '../../../core/IUseCase';
import { CreateUserDTO } from '../entities/User';
import { UserEntity } from '../entities/UserEntity';
import UserFactory from '../entities/UserFactory';

export type CreateUserResponse = Omit<UserEntity, 'password' | 'passwordSalt'>;

export default class CreateUserUseCase
  implements IUseCase<CreateUserDTO, CreateUserResponse>
{
  async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
    const userFactory = new UserFactory();
    const user = await userFactory.create(data);

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
