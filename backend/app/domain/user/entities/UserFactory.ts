import CryptoJsProvider from '../../../providers/CryptoJS/CryptoJsProvider';
import FakeUserDataProvider from '../../../providers/fake/FakeUserDataProvider';
import User from './User';

export default class UserFactory extends User {
  constructor() {
    super(
      process.env.ENV_NAME !== 'test'
        ? FakeUserDataProvider.getInstance()
        : FakeUserDataProvider.getInstance(),
      new CryptoJsProvider(),
    );
  }
}
