import { UserPhoneAlreadyExistsException } from "../exceptions/user-phone-already-exists-exception";
import { UserRepository } from "../user-repository";
import { UserPhone } from "../value-objects/user-phone/user-phone";

export class EnsureUserPhoneIsUnique {

    constructor(private readonly userRepository: UserRepository) {}

    execute(phone: UserPhone): void {
        if(this.userRepository.findByPhone(phone)) {
            throw new UserPhoneAlreadyExistsException(phone.value());
        }
    }

}