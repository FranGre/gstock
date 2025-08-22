describe('Register User Use Case', () => {

    let useCase: RegisterUseCase;

    beforeAll(() => {
        const repository = new InMemoryUserRepository();
        useCase = new RegisterUserUseCase(repository);
    });

    it('should create correctly', () => {
        const command = new RegisterUserCommand('fran', '642603912');

        const result = useCase.execute(command);
        
        expect(result).toEqual({id: result.id, name: command.name, phone: command.phone});
    });

   it('should throw UserNameAlreadyExistsException', () => {
        const sameName = 'jorge';

        useCase.execute(new RegisterUserCommand(sameName, '666666666'));

        expect(() => useCase.execute(new RegisterUserCommand(sameName, '666661111')))
        .toThrow(new UserNameAlreadyExistsException(sameName));
   });

   it('should throw UserPhoneAlreadyExistsException', () => {
        const samePhone = '666668888';

        useCase.execute(new RegisterUserCommand('eiden', samePhone));

        expect(() => useCase.execute(new RegisterUserCommand('lucas', samePhone)))
        .toThrow(new UserPhoneAlreadyExistsException(samePhone));
    });

});