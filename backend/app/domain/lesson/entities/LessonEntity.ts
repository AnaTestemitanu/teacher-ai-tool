export type LessonEntity = {
  id: string;
  userId: string;
  name: string;
  age: number;
  level: 'lower' | 'medium' | 'high';
  groupName: string;
  topic: string;
  tons: string;
  pdfLink?: string;
  pdfPages: string;
};
