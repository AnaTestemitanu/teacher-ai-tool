import LessonFactory from '../../../domain/lesson/entities/LessonFactory';
import UserFactory from '../../../domain/user/entities/UserFactory';

let lessonFactory: LessonFactory;
let userFactory: UserFactory;

describe('Lesson Entity - unit tests', () => {
  beforeEach(() => {
    lessonFactory = new LessonFactory();
    userFactory = new UserFactory();
  });

  it('Should be able to create a lesson', async () => {
    const user = await userFactory.create({
      name: 'user-test',
      dateOfBirth: '1988-06-10',
      email: 'test@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    const response = await lessonFactory.create({
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

  it('Should be able to return a lesson from an user', async () => {
    const user = await userFactory.create({
      name: 'user-test2',
      dateOfBirth: '1988-06-10',
      email: 'test2@teste.com',
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

    const response = await lessonFactory.getLessonByUserId(user.id);
    expect(response?.userId).toBe(user.id);
  });
});
