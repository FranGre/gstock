import { UserPhoneAlreadyExistsException } from "../../domain/exceptions/user-phone-already-exists-exception";
import { UserNameAlreadyExistsException } from "../../domain/exceptions/user-name-already-exists-exception";
import { InMemoryUserRepository } from "../../infrastructure/persistence/in-memory-user-repository";
import { RegisterUserCommand } from "./register-user-command";
import { RegisterUserUseCase } from "./register-user-use-case";
import { EnsureUserNameIsUnique } from "../../domain/services/ensure-user-name-is-unique";
import { EnsureUserPhoneIsUnique } from "../../domain/services/ensure-user-phone-is-unique";

describe('Register User Use Case', () => {

    let useCase: RegisterUserUseCase;
    let ensureUserNameIsUnique: EnsureUserNameIsUnique;
    let ensureUserPhoneIsUnique: EnsureUserPhoneIsUnique;

    beforeAll(() => {
        const repository = new InMemoryUserRepository();
        ensureUserNameIsUnique = new EnsureUserNameIsUnique(repository);
        ensureUserPhoneIsUnique = new EnsureUserPhoneIsUnique(repository);
        useCase = new RegisterUserUseCase(
            repository,
            ensureUserNameIsUnique,
            ensureUserPhoneIsUnique);
    });

    it('should create correctly', () => {
        const command = new RegisterUserCommand('fran', '642603912');

        const result = useCase.execute(command);
        
        expect(result).toEqual({id: result.id, name: command.name, phone: command.phone});
    });

   it('should throw UserNameAlreadyExistsException', () => {
        const sameName = 'jorge';

        useCase.execute(new RegisterUserCommand(sameName, '666666666'));

        expect(() => useCase.execute(new RegisterUserCommand(sameName, '666661111')))
        .toThrow(new UserNameAlreadyExistsException(sameName));
   });

   it('should throw UserPhoneAlreadyExistsException', () => {
        const samePhone = '666668888';

        useCase.execute(new RegisterUserCommand('eiden', samePhone));

        expect(() => useCase.execute(new RegisterUserCommand('lucas', samePhone)))
        .toThrow(new UserPhoneAlreadyExistsException(samePhone));
    });

});