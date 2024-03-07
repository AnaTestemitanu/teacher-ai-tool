import { PresentationQueueMessage } from '../../../domain/lesson/data/ILessonQueue';
import { CreateLessonDTO } from '../../../domain/lesson/entities/Lesson';
import { LessonEntity } from '../../../domain/lesson/entities/LessonEntity';
import GetUserLessonUseCase from '../../../domain/lesson/useCases/GetUserLessonUseCase';
import CreateLessonFactory from '../factories/CreateLessonFactory';
import CreateLessonPresentationFactory from '../factories/CreateLessonPresentationFactory';

export default class LessonController {
  public async create(payload: CreateLessonDTO): Promise<LessonEntity> {
    const createLessonFactory = new CreateLessonFactory();
    return createLessonFactory.execute(payload);
  }

  public async createLessonPresentation(
    data: PresentationQueueMessage,
  ): Promise<void> {
    const createLessonPresentationFactory =
      new CreateLessonPresentationFactory();
    await createLessonPresentationFactory.execute(data);
  }

  public async getUserLesson(
    userId: string,
  ): Promise<LessonEntity | undefined> {
    const getUserLessonUseCase = new GetUserLessonUseCase();
    return getUserLessonUseCase.execute(userId);
  }
}
