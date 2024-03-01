import UserFactory from '../../../domain/user/entities/UserFactory';
import ValidateUserCredentialsUseCase from '../../../domain/user/useCases/ValidateUserCredentialsUseCase';
import JWTTokenProvider from '../../../providers/JWT/JWTAuthProvider';

let validateUserCredentialsUseCase: ValidateUserCredentialsUseCase;

describe('Validate User Credentials Use Case - unit tests', () => {
  beforeEach(() => {
    validateUserCredentialsUseCase = new ValidateUserCredentialsUseCase(
      new JWTTokenProvider(),
    );
  });

  it('Should NOT be able to validate user with non-existing user', async () => {
    await expect(
      validateUserCredentialsUseCase.execute({
        email: 'non-existing-email',
        password: '123',
      }),
    ).rejects.toThrow('User does not exist');
  });

  it('Should NOT be able to validate with wrong credentials', async () => {
    const userFactory = new UserFactory();
    const user = await userFactory.create({
      name: 'user-test',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'male',
      mainLanguage: 'portuguese',
      password: '123',
      yearsOfExperience: 20,
    });

    await expect(
      validateUserCredentialsUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('Should be able to validate credentials', async () => {
    const userFactory = new UserFactory();
    const user = await userFactory.create({
      name: 'user-test2',
      dateOfBirth: '1988-06-10',
      email: 'test2@teste.com',
      gender: 'male',
      mainLanguage: 'portuguese',
      password: '123',
      yearsOfExperience: 20,
    });

    const userToken = await validateUserCredentialsUseCase.execute({
      email: user.email,
      password: '123',
    });

    expect(userToken.token).toBeDefined();
  });
});
