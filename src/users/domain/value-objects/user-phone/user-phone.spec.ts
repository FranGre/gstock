describe('UserPhone Value Object', () => {
    it('should create correctly', () => {
        const userPhone = new UserPhone('123456789');
        expect(userPhone.value()).toBe('123456789');
    })

    it('should throw InvalidUserPhoneException, bcs is empty', () => {
        expect(() => new UserPhone(''))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.EMPTY));
    });

    it('should throw InvalidUserPhoneException, bcs contains letters', () => {
        expect(() => new UserPhone('1234o6789'))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.ONLY_NUMBERS));
    });

    it('should throw InvalidUserPhoneException, bcs length is 10', () => {
        expect(() => new UserPhone('1234567890'))
        .toThrow(new InvalidUserPhoneException(InvalidUserPhoneException.INVALID_LENGTH));
    });
});