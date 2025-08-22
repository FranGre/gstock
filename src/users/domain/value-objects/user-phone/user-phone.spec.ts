import { InvalidUserPhoneException } from "../../exceptions/invalid-user-phone-exception";
import { UserPhone } from "./user-phone";

describe('UserPhone Value Object', () => {
    it('should create correctly', () => {
        const userPhone = new UserPhone('623456789');
        expect(userPhone.value()).toBe('623456789');
    })

    it('should throw InvalidUserPhoneException, bcs is empty', () => {
        expect(() => new UserPhone(''))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.EMPTY));
    });

    it('should throw InvalidUserPhoneException, bcs contains letters', () => {
        expect(() => new UserPhone('6234o6789'))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.ONLY_NUMBERS));
    });

    it('should throw InvalidUserPhoneException, bcs length is 10', () => {
        expect(() => new UserPhone('6234067891'))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.INVALID_LENGTH));
    });
});