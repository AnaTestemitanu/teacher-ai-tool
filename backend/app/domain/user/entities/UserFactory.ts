import BcryptCryptoProvider from '../../../providers/Bcrypt/BcryptCryptoProvider';
import FakeUserDataProvider from '../../../providers/Fake/FakeUserDataProvider';
import PostgresUserRepositoryProvider from '../../../providers/Postgres/PostgresUserRepositoryProvider';
import User from './User';

export default class UserFactory extends User {
  constructor() {
    super(
      process.env.ENV_NAME === 'test'
        ? FakeUserDataProvider.getInstance()
        : new PostgresUserRepositoryProvider(),
      new BcryptCryptoProvider(),
    );
  }
}
