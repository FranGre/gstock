import { UserName } from "./value-objects/user-name/user-name";
import { UserPhone } from "./value-objects/user-phone/user-phone";

export interface UserRepository {

    create(user: User): User;

    findByName(name: UserName): User | null;

    findByPhone(phone: UserPhone): User | null;

}