import axios from 'axios';
import fs from 'fs';
import ILessonPresentationData, {
  GeneratePresentationFileDTO,
  GenerateSlidesDTO,
  GenerateSlidesNotesDTO,
} from '../../domain/lesson/data/ILessonPresentationData';
import { PDFText, PDFTextPL } from './PresentationPDFTexts';
import Log from '../../core/Log';

export default abstract class LessonPresentation
  implements ILessonPresentationData
{
  private tones = {
    only_analogy:
      'Use occasional useful analogies to help explain concepts, while keeping everything factually correct',
    only_humour:
      'Have some humorous moments in the slides, while keeping everything factually accurate',
    homour_and_analogy:
      'Have some humorous moments in the slides, and use occasional useful analogies to help explain concepts, while keeping everything factually correct',
  };

  protected getTone(tone: string): string {
    if (tone.includes('analogy') && tone.includes('humour')) {
      return this.tones.homour_and_analogy;
    }

    if (tone.includes('humour')) {
      return this.tones.only_humour;
    }

    return this.tones.only_analogy;
  }

  protected getText(topic: string) {
    if (topic.toLowerCase() === 'physics') return PDFText;
    return PDFTextPL;
  }

  protected combine(slides: string[], notes: string[]) {
    const combined = [];
    const maxLength = Math.max(slides.length, notes.length);

    for (let i = 0; i < maxLength; i += 1) {
      combined.push({
        content: slides[i] || '',
        note: notes[i] || '',
      });
    }

    return combined;
  }

  protected async downloadImage(
    imageUrl: string,
    outputPath: string,
  ): Promise<void> {
    try {
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error: any) {
      Log.error(error);
      throw error;
    }
  }

  abstract generateSlides(data: GenerateSlidesDTO): Promise<string[]>;

  abstract generateSlideNotes(data: GenerateSlidesNotesDTO): Promise<string[]>;

  abstract generatePresentationFile(
    data: GeneratePresentationFileDTO,
  ): Promise<string>;
}
