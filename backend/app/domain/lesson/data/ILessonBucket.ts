export default interface ILessonBucket {
  saveFile(file: string): Promise<void>;
}
