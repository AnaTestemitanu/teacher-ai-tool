import CreateLessonUseCase from '../../../domain/lesson/useCases/CreateLessonUseCase';
import UserFactory from '../../../domain/user/entities/UserFactory';
import CreateLessonFactory from '../../../infra/lesson/factories/CreateLessonFactory';

let createLessonUseCase: CreateLessonUseCase;
let userFactory: UserFactory;

describe('Create Lesson Use Case - unit tests', () => {
  beforeEach(() => {
    createLessonUseCase = new CreateLessonFactory();
    userFactory = new UserFactory();
  });

  it('Should NOT be able to create a lesson with non-existing user', async () => {
    await expect(
      createLessonUseCase.execute({
        userId: 'invalid-id',
        name: 'group-test',
        age: 10,
        level: 'HIGH',
        groupName: 'group-test',
        pdfPages: '10',
        topic: 'topic-test',
        tons: 'ton-1',
      }),
    ).rejects.toThrow('User does not exist');
  });

  it('Should be able to create a lesson', async () => {
    const user = await userFactory.create({
      name: 'user',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    const response = await createLessonUseCase.execute({
      userId: user.id,
      name: 'group-test',
      age: 10,
      level: 'HIGH',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
      tons: 'ton-1',
    });

    expect(response.id).toBeDefined();
  });
});
