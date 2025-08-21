import { InvalidLengthUserNameException } from "../../exceptions/invalid-length-user-name-exception";

export class UserName {

    private readonly _value: string;

    static MIN_LENGTH = 2;
    static MAX_LENGTH = 20;

    constructor(value: string) {
        this.validateOrThrow(value);
        this._value = value;
    }

    private validateOrThrow(value: string): void {
        if (!(value.length >= UserName.MIN_LENGTH && value.length <= UserName.MAX_LENGTH)) {
            throw new InvalidLengthUserNameException();
        }
    }

    public value(): string {
        return this._value;
    }

}