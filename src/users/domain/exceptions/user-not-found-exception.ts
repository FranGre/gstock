import { UserId } from "../value-objects/user-id/user-id";

export class UserNotFoundException extends Error {

    constructor(userId: UserId) {
        super(`User with id '${userId.value()} not found'`);
        this.name = 'UserNotFound';
    }

}