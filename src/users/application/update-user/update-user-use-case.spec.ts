import { UserRepository } from "../../domain/user-repository";
import { RegisterUserUseCase } from "../register-user/register-user-use-case";
import { InMemoryUserRepository } from "../../infrastructure/persistence/in-memory-user-repository";
import { EnsureUserNameIsUnique } from "../../domain/services/ensure-user-name-is-unique";
import { EnsureUserPhoneIsUnique } from "../../domain/services/ensure-user-phone-is-unique";
import { RegisterUserCommand } from "../register-user/register-user-command";
import { RegisterUserResult } from "../register-user/register-user-result";
import { UserNameAlreadyExistsException } from "../../domain/exceptions/user-name-already-exists-exception";
import { UserPhoneAlreadyExistsException } from "../../domain/exceptions/user-phone-already-exists-exception";
import { UpdateUserUseCase } from "./update-user-use-case";
import { UpdateUserCommand } from "./update-user-command";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found-exception";
import { UserId } from "../../domain/value-objects/user-id/user-id";

describe('Update User Use Case', () => {
    let registerUserUseCase: RegisterUserUseCase;
    let updateUserUseCase: UpdateUserUseCase;

    beforeAll(() => {
        const userRepository: UserRepository = new InMemoryUserRepository();
        const ensureUserNameIsUnique = new EnsureUserNameIsUnique(userRepository);
        const ensureUserPhoneIsUnique = new EnsureUserPhoneIsUnique(userRepository);
        registerUserUseCase = new RegisterUserUseCase(
            userRepository,
            ensureUserNameIsUnique,
            ensureUserPhoneIsUnique
        );
        updateUserUseCase = new UpdateUserUseCase(
            userRepository,
            ensureUserNameIsUnique,
            ensureUserPhoneIsUnique
        );
    });

    it('should update user name correctly',  () => {
        const result: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('goku', '646464646'));

        const newUserName = 'Son Goku';
        expect(
            updateUserUseCase.execute(new UpdateUserCommand(result.id, newUserName, result.phone))
        ).toEqual({
            id: result.id,
            name: newUserName,
            phone : result.phone});
    });

    it('should throw UserNotFoundException',  () => {
        const userId: UserId = new UserId();

        expect(
            () => updateUserUseCase.execute(new UpdateUserCommand(userId.value(), 'hola', '690690690'))
        ).toThrow(new UserNotFoundException(userId));
    });

    it('should update user phone correctly',  () => {
        const result: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('vegetta', '600000000'));

        const newUserPhone = '677777777';
        expect(
            updateUserUseCase.execute(new UpdateUserCommand(result.id, result.name, newUserPhone))
        ).toEqual({
            id: result.id,
            name: result.name,
            phone : newUserPhone});
    });

    // Salta la exception si el name ya existe en bd y no pertenece al user que vas a actualizar
    it('should throw UserNameAlreadyExists', () => {
        const result: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('freezer', '611111111'));

        const userName = 'vegetta';
        expect(
            () => updateUserUseCase.execute(new UpdateUserCommand(result.id, userName, result.phone))
        ).toThrow(new UserNameAlreadyExistsException(userName));
    });

    // Salta la exception si el phone ya existe en bd y no pertenece al user que vas a actualizar
    it('should throw UserPhoneAlreadyExists', () => {
        const result: RegisterUserResult = registerUserUseCase.execute(new RegisterUserCommand('krilin', '688888888'));

        const userPhone = '611111111';
        expect(
            () => updateUserUseCase.execute(new UpdateUserCommand(result.id, result.name, userPhone))
        ).toThrow(new UserPhoneAlreadyExistsException(userPhone));
    });
});