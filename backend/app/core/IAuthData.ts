export default interface IAuthData {
  sign(parylaod: any, secret: string): string;
  verifyToken(token: string, secret: string): string;
}
