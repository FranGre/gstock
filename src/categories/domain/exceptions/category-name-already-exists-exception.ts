export class CategoryNameAlreadyExistsException extends Error {

    constructor(name: string) {
        super(`Category Name '${name}' already exists`);
        this.name = 'CategoryNameAlreadyExistsException';
    }

}