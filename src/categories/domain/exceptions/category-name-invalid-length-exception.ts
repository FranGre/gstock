import { CategoryName } from "../value-objects/category-name/category-name";

export class CategoryNameInvalidLengthException extends Error {

    constructor() {
        super(`Invalid category name length, must be between ${CategoryName.MIN_LENGTH} and ${CategoryName.MAX_LENGTH}`);
        this.name = 'CategoryNameInvalidLengthException';
    }

}