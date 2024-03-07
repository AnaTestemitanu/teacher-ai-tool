import UserFactory from '../../../domain/user/entities/UserFactory';
import DeleteUserUseCase from '../../../domain/user/useCases/DeleteUserUseCase';

let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User Use Case - unit tests', () => {
  beforeEach(() => {
    deleteUserUseCase = new DeleteUserUseCase();
  });

  it('Should be able to delete a user', async () => {
    const userFactory = new UserFactory();
    const user = await userFactory.create({
      name: 'user-test3',
      dateOfBirth: '1988-06-10',
      email: 'test3@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    const response = await deleteUserUseCase.execute(user.id);
    const userDeleted = await userFactory.getUserById(user.id);

    expect(response).toBe(true);
    expect(userDeleted).toBeUndefined();
  });
});
