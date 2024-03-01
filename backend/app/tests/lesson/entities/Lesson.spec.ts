import LessonFactory from '../../../domain/lesson/entities/LessonFactory';

let lessonFactory: LessonFactory;

describe('Lesson Entity - unit tests', () => {
  beforeEach(() => {
    lessonFactory = new LessonFactory();
  });

  it('Should be able to create a lesson', async () => {
    const response = await lessonFactory.create({
      userId: 'user-1',
      name: 'group-test',
      age: 10,
      level: 'high',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
    });
    expect(response.id).toBeDefined();
  });

  it('Should be able to return a lesson from an user', async () => {
    await lessonFactory.create({
      userId: 'user-1',
      name: 'group-test',
      age: 10,
      level: 'high',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
    });

    const response = await lessonFactory.getLessonByUserId('user-1');
    expect(response?.userId).toBe('user-1');
  });
});
