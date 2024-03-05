import { UserEntity } from '../../user/entities/UserEntity';
import { LessonEntity } from '../entities/LessonEntity';

export type GenerateSlidesDTO = {
  language: string;
  lesson: {
    id: LessonEntity['id'];
    topic: LessonEntity['topic'];
    age: LessonEntity['age'];
    level: LessonEntity['level'];
    tons: string;
  };
};

export type GenerateSlidesNotesDTO = {
  slides: string[];
  lesson: {
    id: LessonEntity['id'];
    age: LessonEntity['age'];
    level: LessonEntity['level'];
  };
  user: {
    dateOfBirth: UserEntity['dateOfBirth'];
    yearsOfExperience: UserEntity['yearsOfExperience'];
  };
};

export type GeneratePresentationFileDTO = {
  filePath: string;
  slides: string[];
  notes: string[];
  lesson: {
    id: LessonEntity['id'];
    topic: LessonEntity['topic'];
    name: LessonEntity['name'];
  };
  user: {
    name: UserEntity['name'];
  };
};

export default interface ILessonPresentationData {
  generateSlides(data: GenerateSlidesDTO): Promise<string[]>;
  generateSlideNotes(data: GenerateSlidesNotesDTO): Promise<string[]>;
  generatePresentationFile(data: GeneratePresentationFileDTO): Promise<string>;
}
