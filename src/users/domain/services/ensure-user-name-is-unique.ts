import { UserNameAlreadyExistsException } from "../exceptions/user-name-already-exists-exception";
import { UserRepository } from "../user-repository";
import { UserName } from "../value-objects/user-name/user-name";

export class EnsureUserNameIsUnique {

    constructor(private readonly userRepository: UserRepository) {}

    execute(name: UserName): void {
        if(this.userRepository.findByName(name)) {
            throw new UserNameAlreadyExistsException(name.value());
        }
    }

}