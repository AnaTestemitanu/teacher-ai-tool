import { CreateUserDTO } from '../../../domain/user/entities/User';
import CreateUserUseCase, {
  CreateUserResponse,
} from '../../../domain/user/useCases/CreateUserUseCase';
import DeleteUserUseCase from '../../../domain/user/useCases/DeleteUserUseCase';
import GetAllUsersUseCase, {
  GetAllUsersResponse,
} from '../../../domain/user/useCases/GetAllUsersUseCase';
import GetUserByEmailUseCase, {
  GetUserByEmailResponse,
} from '../../../domain/user/useCases/GetUserByEmailUseCase';
import GetUserUseCase, {
  GetUserUseCaseResponse,
} from '../../../domain/user/useCases/GetUserUseCase';
import {
  ValidateUserCredentialsDTO,
  ValidateUserCredentialsResponse,
} from '../../../domain/user/useCases/ValidateUserCredentialsUseCase';
import ValidateUserCredentialsFactory from '../factories/ValidateUserCredentialsFactory';

export default class UserController {
  public async create(payload: CreateUserDTO): Promise<CreateUserResponse> {
    const createUserUseCase = new CreateUserUseCase();
    return createUserUseCase.execute(payload);
  }

  public async getUser(
    userId: string,
  ): Promise<GetUserUseCaseResponse | undefined> {
    const getUserUseCase = new GetUserUseCase();
    return getUserUseCase.execute(userId);
  }

  public async getByEmail(
    email: string,
  ): Promise<GetUserByEmailResponse | undefined> {
    const getUserByEmailUseCase = new GetUserByEmailUseCase();
    return getUserByEmailUseCase.execute(email);
  }

  public async getAllUsers(): Promise<GetAllUsersResponse[]> {
    const getAllUsersUseCase = new GetAllUsersUseCase();
    return getAllUsersUseCase.execute();
  }

  public async delete(userId: string): Promise<boolean> {
    const deleteUserUseCase = new DeleteUserUseCase();
    return deleteUserUseCase.execute(userId);
  }

  public async validateLogin(
    payload: ValidateUserCredentialsDTO,
  ): Promise<ValidateUserCredentialsResponse> {
    const validateUserCredentialsUseCase = new ValidateUserCredentialsFactory();
    return validateUserCredentialsUseCase.execute(payload);
  }
}
