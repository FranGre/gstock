export class UserPhoneAlreadyExistsException extends Error {

    constructor(phone: string) {
        super(`User Phone ${phone} already exists`);
        this.name = 'UserPhoneAlreadyExistsException';
    }

}