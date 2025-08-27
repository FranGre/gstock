import { UserNotFoundException } from "../exceptions/user-not-found-exception";
import { UserRepository } from "../user-repository";
import { UserId } from "../value-objects/user-id/user-id";

export class EnsureUserWithIdExists {

    constructor(private readonly userRepository: UserRepository) {}

    execute(userId: UserId): void {
        if (!this.userRepository.findById(userId)) {
            throw new UserNotFoundException(userId.value());
        }
    }

}