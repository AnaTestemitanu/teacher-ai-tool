export type UserEntity = {
  id: string;
  name: string;
  dateOfBirth: number;
  yearsOfExperience: number;
  gender: 'male' | 'female' | 'non_binary';
  mainLanguage: string;
};
