import { genSalt, hash } from 'bcrypt';
import { ICryptoData } from '../../core/ICryptoData';

export default class CryptoJsProvider implements ICryptoData {
  public async generateSecretKey(): Promise<string> {
    return genSalt();
  }

  public async encrypt(text: string, secretKey: string): Promise<string> {
    return hash(text, secretKey);
  }
}
