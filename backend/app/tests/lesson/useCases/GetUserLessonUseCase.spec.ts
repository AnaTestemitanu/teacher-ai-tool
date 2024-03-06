import LessonFactory from '../../../domain/lesson/entities/LessonFactory';
import GetUserLessonUseCase from '../../../domain/lesson/useCases/GetUserLessonUseCase';

let getUserLessonUseCase: GetUserLessonUseCase;
let lessonFactory: LessonFactory;

describe('Get User Lesson Use Case - unit tests', () => {
  beforeAll(() => {
    lessonFactory = new LessonFactory();
  });

  beforeEach(() => {
    getUserLessonUseCase = new GetUserLessonUseCase();
  });

  it('Should be able to return a lesson from an user', async () => {
    await lessonFactory.create({
      userId: 'user-1',
      name: 'group-test',
      age: 10,
      level: 'HIGH',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
      tons: 'ton-1',
    });

    const response = await getUserLessonUseCase.execute('user-1');
    expect(response?.userId).toBe('user-1');
  });
});
