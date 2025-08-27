import { UserId } from "../../users/domain/value-objects/user-id/user-id";
import { CategoryId } from "./value-objects/category-id/category-id";
import { CategoryName } from "./value-objects/category-name/category-name";

export class Category {

    constructor(
        private _categoryId: CategoryId,
        private _categoryName: CategoryName,
        private _userId: UserId
    ) {}

    id(): CategoryId {
        return this._categoryId;
    }

    name(): CategoryName {
        return this._categoryName;
    }

    userId(): UserId {
        return this._userId;
    }

}