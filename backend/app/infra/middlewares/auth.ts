import JWTTokenProvider from '../../providers/JWT/JWTAuthProvider';

export const isValidToken = (token: string): boolean => {
  try {
    const authProvider = new JWTTokenProvider();
    const decrypted = authProvider.verifyToken(
      token,
      String(process.env.AUTH_SECRET_KEY),
    );

    return !!decrypted;
  } catch {
    return false;
  }
};
