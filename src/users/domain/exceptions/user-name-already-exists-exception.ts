export class UserNameAlreadyExistsException extends Error {

    constructor(name: string) {
        super(`User Name ${name} already exists`);
        this.name = 'UserNameAlreadyExistsException';
    }

}