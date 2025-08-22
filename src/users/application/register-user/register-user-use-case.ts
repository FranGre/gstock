import { UserRepository } from "../../domain/user-repository";
import { UserName } from "../../domain/value-objects/user-name/user-name";
import { UserPhone } from "../../domain/value-objects/user-phone/user-phone";
import { RegisterUserCommand } from "./register-user-command";
import { RegisterUserResult } from "./register-user-result";
import { User } from "../../domain/user";
import { EnsureUserNameIsUnique } from "../../domain/services/ensure-user-name-is-unique";
import { EnsureUserPhoneIsUnique } from "../../domain/services/ensure-user-phone-is-unique";
import { UserId } from "../../domain/value-objects/user-id/user-id";

export class RegisterUserUseCase {

    constructor(
        private readonly repository: UserRepository,
        private readonly ensureUserNameIsUnique: EnsureUserNameIsUnique,
        private readonly ensureUserPhoneIsUnique: EnsureUserPhoneIsUnique,
    ) {}

    execute(command: RegisterUserCommand): RegisterUserResult {
        const userName = new UserName(command.name);
        const userPhone = new UserPhone(command.phone);
        const id = new UserId();

        this.ensureUserNameIsUnique.execute(userName);
        this.ensureUserPhoneIsUnique.execute(userPhone);

        const user = new User(id, userName, userPhone);

        this.repository.create(user);

        return new RegisterUserResult(user.id().value(), user.name().value(), user.phone().value());
    }

}