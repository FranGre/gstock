export class InvalidUserPhoneException extends Error {

    static EMPTY = 'User Phone can not be empty';
    static ONLY_NUMBERS = 'User Phone must contains only numbers';
    static INVALID_LENGTH = 'User Phone length must be 9';

    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserPhoneException';
    }

}