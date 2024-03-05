import ILessonBucket from '../../domain/lesson/data/ILessonBucket';

export default class S3BucketProvider implements ILessonBucket {
  async saveFile(_file: string): Promise<void> {
    // implemente de code here...
  }
}
