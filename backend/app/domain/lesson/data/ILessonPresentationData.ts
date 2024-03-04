import { UserEntity } from '../../user/entities/UserEntity';
import { LessonEntity } from '../entities/LessonEntity';

export type GenerateSlidesDTO = {
  pdfText?: string;
  language: string;
  lesson: {
    age: LessonEntity['age'];
    level: LessonEntity['level'];
    tons: LessonEntity['tons'];
  };
};

export type GenerateSlidesNotesDTO = {
  slides: Slide[];
  language: string;
  lesson: {
    age: LessonEntity['age'];
    level: LessonEntity['level'];
  };
  user: {
    dateOfBirth: UserEntity['dateOfBirth'];
    yearsOfExperience: UserEntity['yearsOfExperience'];
  };
};

export type GeneratePresentationFileDTO = {
  slides: Slide[];
  notes: Note[];
  lesson: {
    topic: LessonEntity['topic'];
    name: LessonEntity['name'];
  };
  user: {
    name: UserEntity['name'];
  };
};

export type Slide = string[];
export type Note = string[];

export default interface ILessonPresentationData {
  generateSlides(data: GenerateSlidesDTO): Promise<Slide[]>;
  generateSlideNotes(data: GenerateSlidesNotesDTO): Promise<Note[]>;
  generatePresentationFile(data: GeneratePresentationFileDTO): Promise<string>;
}
