export type UserEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordSalt: string;
  dateOfBirth: string;
  yearsOfExperience: number;
  gender: 'male' | 'female' | 'non_binary';
  mainLanguage: string;
};
