import { CategoryRepository } from "../category-repository";
import { CategoryNameAlreadyExistsException } from "../exceptions/category-name-already-exists-exception";
import { CategoryName } from "../value-objects/category-name/category-name";

export class EnsureCategoryNameNotExists {

    constructor(private readonly categoryRepository: CategoryRepository) {}

    execute(categoryName: CategoryName): void {
        if (this.categoryRepository.findByName(categoryName)) {
            throw new CategoryNameAlreadyExistsException(categoryName.value());
        }
    }

}