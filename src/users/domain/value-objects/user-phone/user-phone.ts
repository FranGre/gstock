import { InvalidUserPhoneException } from "../../exceptions/invalid-user-phone-exception";

export class UserPhone {

    private readonly _value: string;

    constructor(value: string) {
        if (!value) {
            throw new InvalidUserPhoneException(InvalidUserPhoneException.EMPTY);
        }

        if (!(value.length == 9)) {
            throw new InvalidUserPhoneException(InvalidUserPhoneException.INVALID_LENGTH)
        }

        if (!value.match(/^(?:[6-9]\d{8})$/)) {
            throw new InvalidUserPhoneException(InvalidUserPhoneException.ONLY_NUMBERS)
        }

        this._value = value;
    }

    value(): string {
        return this._value;
    }

}