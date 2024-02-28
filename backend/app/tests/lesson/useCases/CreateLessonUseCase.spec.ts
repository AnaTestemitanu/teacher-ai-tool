import CreateLessonUseCase from '../../../domain/lesson/useCases/CreateLessonUseCase';

let createLessonUseCase: CreateLessonUseCase;

describe('Create Lesson Use Case - unit tests', () => {
  beforeEach(() => {
    createLessonUseCase = new CreateLessonUseCase();
  });

  it('Should be able to create a lesson', async () => {
    const response = await createLessonUseCase.execute({
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
});
