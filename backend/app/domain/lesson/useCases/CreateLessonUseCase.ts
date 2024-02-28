import IUseCase from '../../../core/IUseCase';
import { CreateLessonDTO } from '../data/ILessonData';
import { LessonEntity } from '../entities/LessonEntity';
import LessonFactory from '../entities/LessonFactory';

export default class CreateLessonUseCase
  implements IUseCase<CreateLessonDTO, LessonEntity>
{
  async execute(data: CreateLessonDTO): Promise<LessonEntity> {
    const lessonFactory = new LessonFactory();
    return lessonFactory.create(data);
  }
}
