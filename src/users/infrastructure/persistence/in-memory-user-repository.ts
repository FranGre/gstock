import { UserId } from "../../domain/value-objects/user-id/user-id";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user-repository";
import { UserName } from "../../domain/value-objects/user-name/user-name";
import { UserPhone } from "../../domain/value-objects/user-phone/user-phone";

export class InMemoryUserRepository implements UserRepository{

    private users: User[] = [];

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    findById(id: UserId): User | null {
        for (const user of this.users) {
            if (user.id().value() == id.value()) {
                return user;
            }
        }

        return null;
    }

    findByName(name: UserName): User | null {
        for (const user of this.users) {
            if (user.name().value() == name.value()) {
                return user;
            }
        }

        return null;
    }

    findByPhone(phone: UserPhone): User | null {
        for (const user of this.users) {
            if (user.phone().value() == phone.value()) {
                return user;
            }
        }

        return null;
    }

    update(user: User): User {
        this.users.push(user);
        return user;
    }
    
}