export class CategoryNameEmptyException extends Error {

    constructor() {
        super('Category Name can not be empty');
        this.name = 'CategoryNameEmptyException';
    }

}