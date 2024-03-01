import BcryptCryptoProvider from '../../../providers/Bcrypt/BcryptCryptoProvider';
import FakeUserDataProvider from '../../../providers/Fake/FakeUserDataProvider';
import User from './User';

export default class UserFactory extends User {
  constructor() {
    super(
      process.env.ENV_NAME !== 'test'
        ? FakeUserDataProvider.getInstance()
        : FakeUserDataProvider.getInstance(),
      new BcryptCryptoProvider(),
    );
  }
}
