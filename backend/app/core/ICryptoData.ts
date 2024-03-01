export interface ICryptoData {
  generateSecretKey(): Promise<string>;
  encrypt(text: string, secretKey: string): Promise<string>;
}
