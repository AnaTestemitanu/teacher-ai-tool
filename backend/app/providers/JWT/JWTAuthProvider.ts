import { verify } from 'jsonwebtoken';
import IAuthData from '../../core/IAuthData';

export default class JWTTokenProvider implements IAuthData {
  public verifyToken(token: string, secret: string): string {
    return verify(token, secret) as string;
  }
}
