import { InvalidLengthUserNameException } from "../../exceptions/invalid-length-user-name-exception";
import { UserName } from "./user-name";

describe('UserName Value Object', () => {
    it('should create correctly', () => {
        const userName = new UserName('fran');
        expect(userName.value()).toBe('fran');
    });

    it('should throw InvalidLengthUserNameException, not between 2 and 20', () => {
        expect(() => new UserName('a')).toThrow(new InvalidLengthUserNameException());
    });

    it('should throw InvalidLengthUserNameException, not between 2 and 20', () => {
        expect(() => new UserName('123456789012345678901')).toThrow(new InvalidLengthUserNameException());
    });
});