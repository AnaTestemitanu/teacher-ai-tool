import IAuthData from '../../../core/IAuthData';
import IUseCase from '../../../core/IUseCase';
import UserFactory from '../entities/UserFactory';

export type ValidateUserCredentialsDTO = {
  email: string;
  password: string;
};

export type ValidateUserCredentialsResponse = {
  token: string;
};

export default class ValidateUserCredentialsUseCase
  implements
    IUseCase<ValidateUserCredentialsDTO, ValidateUserCredentialsResponse>
{
  constructor(private authDataProvider: IAuthData) {}

  async execute({
    email,
    password,
  }: ValidateUserCredentialsDTO): Promise<ValidateUserCredentialsResponse> {
    const userFactory = new UserFactory();
    const user = await userFactory.getUserByEmail(email);

    if (!user?.id) {
      throw new Error('User does not exist');
    }

    const isValidUserCredentials = await userFactory.isValidUserCredentials(
      email,
      password,
    );

    if (!isValidUserCredentials) throw new Error('Invalid credentials');

    const token = this.authDataProvider.sign(
      { userId: user.id },
      user.passwordSalt,
    );

    return { token };
  }
}
