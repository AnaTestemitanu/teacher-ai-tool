import { sign, verify } from 'jsonwebtoken';
import IAuthData from '../../core/IAuthData';

export default class JWTTokenProvider implements IAuthData {
  public sign(paylaod: any, secret: string): string {
    return sign(paylaod, secret, { expiresIn: '5h' });
  }

  public verifyToken(token: string, secret: string): string {
    return verify(token, secret) as string;
  }
}
