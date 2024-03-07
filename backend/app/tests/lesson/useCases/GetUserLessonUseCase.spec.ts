import { v4 as uuidV4 } from 'uuid';
import LessonFactory from '../../../domain/lesson/entities/LessonFactory';
import GetUserLessonUseCase from '../../../domain/lesson/useCases/GetUserLessonUseCase';
import UserFactory from '../../../domain/user/entities/UserFactory';

let getUserLessonUseCase: GetUserLessonUseCase;
let lessonFactory: LessonFactory;
let userFactory: UserFactory;

describe('Get User Lesson Use Case - unit tests', () => {
  beforeAll(() => {
    lessonFactory = new LessonFactory();
    userFactory = new UserFactory();
  });

  beforeEach(() => {
    getUserLessonUseCase = new GetUserLessonUseCase();
  });

  it('Should NOT be able to return a lesson for non-existing user', async () => {
    await expect(getUserLessonUseCase.execute(uuidV4())).rejects.toThrow(
      'User does not exist',
    );
  });

  it('Should be able to return a lesson from an user', async () => {
    const user = await userFactory.create({
      name: 'user-test',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    await lessonFactory.create({
      userId: user.id,
      name: 'group-test',
      age: 10,
      level: 'HIGH',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
      tons: 'ton-1',
    });

    const response = await getUserLessonUseCase.execute(user.id);
    expect(response?.userId).toBe(user.id);
  });
});
