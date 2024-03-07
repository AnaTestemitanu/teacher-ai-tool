import CreateUserUseCase from '../../../domain/user/useCases/CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case - unit tests', () => {
  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase();
  });

  it('Should be able to create a user', async () => {
    const response = await createUserUseCase.execute({
      name: 'user-test',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });
    expect(response.id).toBeDefined();
  });
});
