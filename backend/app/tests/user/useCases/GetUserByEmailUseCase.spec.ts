import UserFactory from '../../../domain/user/entities/UserFactory';
import GetUserByEmailUseCase from '../../../domain/user/useCases/GetUserByEmailUseCase';

let getUserByEmailUseCase: GetUserByEmailUseCase;

describe('Get User By Id Use Case - unit tests', () => {
  beforeEach(() => {
    getUserByEmailUseCase = new GetUserByEmailUseCase();
  });

  it('Should NOT be able to return an inexisting user email', async () => {
    const response = await getUserByEmailUseCase.execute('non-existing-email');
    expect(response).toBeUndefined();
  });

  it('Should be able to return all users', async () => {
    const userFactory = new UserFactory();

    const user = await userFactory.create({
      name: 'user-test',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    const response = await getUserByEmailUseCase.execute(user.email);
    expect(response?.email).toBe(user.email);
  });
});
