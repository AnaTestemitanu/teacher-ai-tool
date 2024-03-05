import {
  GeneratePresentationFileDTO,
  GenerateSlidesDTO,
  GenerateSlidesNotesDTO,
} from '../../domain/lesson/data/ILessonPresentationData';
import AntropicPresentationProvider from './Antropic/AntropicPresentationProvider';
import LessonPresentation from './LessonPresentation';
import OpenAIPresentationProvider from './OpenAI/OpenAIPresentationProvider';

export default class LessonPresentationFactory extends LessonPresentation {
  private slidesProvider: AntropicPresentationProvider;

  private lessonFilePresentationProvider: OpenAIPresentationProvider;

  constructor() {
    super();
    this.slidesProvider = new AntropicPresentationProvider();
    this.lessonFilePresentationProvider = new OpenAIPresentationProvider();
  }

  public async generateSlides(data: GenerateSlidesDTO): Promise<string[]> {
    return this.slidesProvider.generateSlides(data);
  }

  public async generateSlideNotes(
    data: GenerateSlidesNotesDTO,
  ): Promise<string[]> {
    return this.slidesProvider.generateSlideNotes(data);
  }

  public async generatePresentationFile(
    data: GeneratePresentationFileDTO,
  ): Promise<string> {
    return this.lessonFilePresentationProvider.generatePresentationFile(data);
  }
}
