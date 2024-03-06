import ValidateUserCredentialsUseCase from '../../../domain/user/useCases/ValidateUserCredentialsUseCase';
import JWTTokenProvider from '../../../providers/JWT/JWTAuthProvider';

export default class ValidateUserCredentialsFactory extends ValidateUserCredentialsUseCase {
  constructor() {
    super(new JWTTokenProvider());
  }
}
