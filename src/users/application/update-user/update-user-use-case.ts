import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { UpdateUserCommand } from "./update-user-command";
import { UpdateUserResult } from "./update-user-result";
import { UserId } from "../../domain/value-objects/user-id/user-id";
import { UserName } from "../../domain/value-objects/user-name/user-name";
import { UserPhone } from "../../domain/value-objects/user-phone/user-phone";
import { EnsureUserNameIsUnique } from "../../domain/services/ensure-user-name-is-unique";
import { EnsureUserPhoneIsUnique } from "../../domain/services/ensure-user-phone-is-unique";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found-exception";

export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly ensureUserNameIsUnique: EnsureUserNameIsUnique,
        private readonly ensureUserPhoneIsUnique: EnsureUserPhoneIsUnique,
    ) {}

    execute(command: UpdateUserCommand): UpdateUserResult {
        const userId = new UserId(command.id);
        const userName = new UserName(command.name);
        const userPhone = new UserPhone(command.phone);

        let user = this.findUserOrThrow(userId);
        this.changeUserNameIfDifferent(user, userName);
        this.changeUserPhoneIfDifferent(user, userPhone);

        this.userRepository.update(user);

        return new UpdateUserResult(
            user.id().value(),
            user.name().value(),
            user.phone().value()
        );
    }

    private findUserOrThrow(userId: UserId) {
        const user = this.userRepository.findById(userId);

        if (!user) {
            throw new UserNotFoundException(userId);
        }

        return user;
    }

    private changeUserNameIfDifferent(user: User, userName: UserName) {
        if (user.name().value() != userName.value()) {
            this.ensureUserNameIsUnique.execute(userName);
            user.changeName(userName);
        }
    }

    private changeUserPhoneIfDifferent(user: User, userPhone: UserPhone) {
        if (user.phone().value() != userPhone.value()) {
            this.ensureUserPhoneIsUnique.execute(userPhone);
            user.changePhone(userPhone);
        }
    }

}