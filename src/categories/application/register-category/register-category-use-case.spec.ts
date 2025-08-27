import { CategoryNameAlreadyExistsException } from "../../domain/exceptions/category-name-already-exists-exception";
import { RegisterCategoryCommand } from "./register-category-command";
import { RegisterCategoryResult } from "./register-category-result";
import { RegisterCategoryUseCase } from "./register-category-use-case";
import { InMemoryCategoryRepository } from "../../infrastructure/persistence/in-memory-category-repository";
import { EnsureCategoryNameNotExists } from "../../domain/services/ensure-category-name-not-exists";
import { UserNotFoundException } from "../../../users/domain/exceptions/user-not-found-exception";
import { EnsureUserWithIdExists } from "../../../users/domain/services/ensure-user-with-id-exists";
import { InMemoryUserRepository } from "../../../users/infrastructure/persistence/in-memory-user-repository";
import { RegisterUserUseCase } from "../../../users/application/register-user/register-user-use-case";
import { EnsureUserNameIsUnique } from "../../../users/domain/services/ensure-user-name-is-unique";
import { EnsureUserPhoneIsUnique } from "../../../users/domain/services/ensure-user-phone-is-unique";
import { RegisterUserResult } from "../../../users/application/register-user/register-user-result";
import { RegisterUserCommand } from "../../../users/application/register-user/register-user-command";

describe('Register Category Use Case', () => {

    let userRepository: InMemoryUserRepository;
    let categoryRepository: InMemoryCategoryRepository;
    let registerUserUseCase: RegisterUserUseCase;
    let ensureUserWithIdExists: EnsureUserWithIdExists;
    let useCase: RegisterCategoryUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();

        registerUserUseCase = new RegisterUserUseCase(
            userRepository,
            new EnsureUserNameIsUnique(userRepository),
            new EnsureUserPhoneIsUnique(userRepository)
        );
        ensureUserWithIdExists = new EnsureUserWithIdExists(userRepository);

        useCase = new RegisterCategoryUseCase(
            categoryRepository,
            new EnsureCategoryNameNotExists(categoryRepository),
            ensureUserWithIdExists
        );
    });

    it('should register a new category', () => {
        const registerUserResult: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('paco', '609609609'));

        const command: RegisterCategoryCommand = new RegisterCategoryCommand('Alimentacion', registerUserResult.id);
        const result: RegisterCategoryResult = useCase.execute(command);

        expect(result)
        .toEqual({
            id: result.id,
            name: result.name,
            userId: registerUserResult.id
        });
    });

    it('should throw CategoryNameAlreadyExistsException', () => {
        const registerUserResult: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('Gohan', '688688688'));

        const command: RegisterCategoryCommand = new RegisterCategoryCommand('Hogar', registerUserResult.id);
        useCase.execute(command);

        expect(() => useCase.execute(command))
        .toThrow(new CategoryNameAlreadyExistsException(command.name));
    });

    it('should throw UserNotFoundException', () => {
        const userIdNotExists = '8bdbd002-4050-411f-bd7f-1355ae13c6c3';
        const command: RegisterCategoryCommand = new RegisterCategoryCommand('Informatica', userIdNotExists);

        expect(() => useCase.execute(command))
        .toThrow(new UserNotFoundException(command.userId));
    })

});