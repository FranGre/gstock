import { UserName } from "../value-objects/user-name/user-name";

export class InvalidLengthUserNameException extends Error {

    constructor() {
        super(`Invalid name length, must be between ${UserName.MIN_LENGTH} and ${UserName.MAX_LENGTH}`);
        this.name = 'InvalidLengthUserNameException';
    }

}