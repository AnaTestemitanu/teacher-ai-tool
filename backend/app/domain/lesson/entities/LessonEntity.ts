export type LessonEntity = {
  id: string;
  userId: string;
  name: string;
  age: number;
  level: 'LOWER' | 'MEDIUM' | 'HIGH';
  groupName: string;
  topic: string;
  tons: string;
  pdfLink?: string;
  pdfPages: string;
  createdAt?: string;
};
