import LessonFactory from '../../../domain/lesson/entities/LessonFactory';
import CreateLessonPresentationUseCase from '../../../domain/lesson/useCases/CreateLessonPresentationUseCase';
import UserFactory from '../../../domain/user/entities/UserFactory';
import FakePresentationDataProvider from '../../../providers/Fake/FakePresentationDataProvider';
import S3BucketProvider from '../../../providers/AWS/S3/S3BucketProvider';

let createLessonPresentationUseCase: CreateLessonPresentationUseCase;
let lessonFactory: LessonFactory;
let userFactory: UserFactory;
let fakePresentationDataProvider: FakePresentationDataProvider;
let fakeBucketProvider: S3BucketProvider;

describe('Create Lesson Presentation User Use Case - unit tests', () => {
  beforeEach(() => {
    lessonFactory = new LessonFactory();
    userFactory = new UserFactory();
    fakePresentationDataProvider = new FakePresentationDataProvider();
    fakeBucketProvider = new S3BucketProvider();
    createLessonPresentationUseCase = new CreateLessonPresentationUseCase(
      fakePresentationDataProvider,
      fakeBucketProvider,
    );
  });

  it('Should be able to create a user', async () => {
    const user = await userFactory.create({
      name: 'user-test9',
      dateOfBirth: '1988-06-10',
      email: 'test9@teste.com',
      gender: 'MALE',
      mainLanguage: 'portuguese',
      password: 'Teste@123',
      yearsOfExperience: 20,
    });

    const lesson = await lessonFactory.create({
      userId: user.id,
      name: 'group-test',
      age: 10,
      level: 'HIGH',
      groupName: 'group-test',
      pdfPages: '10',
      topic: 'topic-test',
      tons: 'ton-1',
    });

    const bucketRequest = jest.spyOn(fakeBucketProvider, 'saveFile');

    await createLessonPresentationUseCase.execute({
      filePath: '/tmp',
      user,
      lesson,
    });

    expect(bucketRequest).toHaveBeenCalled();
  });
});
