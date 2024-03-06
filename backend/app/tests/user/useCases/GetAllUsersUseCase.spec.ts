import UserFactory from '../../../domain/user/entities/UserFactory';
import GetAllUsersUseCase from '../../../domain/user/useCases/GetAllUsersUseCase';

let getAllUsersUseCase: GetAllUsersUseCase;

describe('Get All Users Use Case - unit tests', () => {
  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase();
  });

  it('Should be able to return an empty array of users if no users exits', async () => {
    const response = await getAllUsersUseCase.execute();
    expect(response.length).toBe(0);
  });

  it('Should be able to return all users', async () => {
    const userFactory = new UserFactory();

    await userFactory.create({
      name: 'user-test3',
      dateOfBirth: '1988-06-10',
      email: 'test3@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: '123',
      yearsOfExperience: 20,
    });

    await userFactory.create({
      name: 'user-test4',
      dateOfBirth: '1988-06-10',
      email: 'test4@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: '123',
      yearsOfExperience: 20,
    });

    const response = await getAllUsersUseCase.execute();
    expect(response.length).toBe(2);
  });
});
