export default interface IAuthData {
  verifyToken(token: string, secret: string): string;
}
