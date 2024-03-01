import UserFactory from '../../../domain/user/entities/UserFactory';
import GetUserUseCase from '../../../domain/user/useCases/GetUserUseCase';

let getUserUseCase: GetUserUseCase;

describe('Get User By Id Use Case - unit tests', () => {
  beforeEach(() => {
    getUserUseCase = new GetUserUseCase();
  });

  it('Should NOT be able to return an inexisting user ID', async () => {
    const response = await getUserUseCase.execute('non-existing-user');
    expect(response).toBeUndefined();
  });

  it('Should be able to return all users', async () => {
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

    const response = await getUserUseCase.execute(user.id);
    expect(response?.id).toBe(user.id);
  });
});
