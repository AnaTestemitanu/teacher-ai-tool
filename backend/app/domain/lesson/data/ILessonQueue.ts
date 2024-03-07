import { UserEntity } from '../../user/entities/UserEntity';
import { LessonEntity } from '../entities/LessonEntity';

export type PresentationQueueMessage = {
  filePath: string;
  lesson: LessonEntity;
  user: Omit<UserEntity, 'password' | 'passwordSalt'>;
};

export interface ILessonQueue {
  sendPresentationToQueue(data: PresentationQueueMessage): Promise<void>;
}
