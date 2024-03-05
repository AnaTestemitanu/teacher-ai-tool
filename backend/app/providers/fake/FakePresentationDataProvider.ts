import ILessonPresentationData from '../../domain/lesson/data/ILessonPresentationData';

export default class FakePresentationDataProvider
  implements ILessonPresentationData
{
  public async generateSlides(): Promise<string[]> {
    return ['Slide 1', 'Slide 2'];
  }

  public async generateSlideNotes(): Promise<string[]> {
    return ['Slide Note 1', 'Slide Note 2'];
  }

  public async generatePresentationFile(): Promise<string> {
    return 'file-1.ppt';
  }
}
