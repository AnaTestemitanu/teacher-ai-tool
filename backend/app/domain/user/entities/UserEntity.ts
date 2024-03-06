export type UserEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordSalt: string;
  dateOfBirth: string;
  yearsOfExperience: number;
  gender: 'MALE' | 'FEMALE' | 'NON-BINARY';
  mainLanguage: string;
  createdAt?: string;
};
