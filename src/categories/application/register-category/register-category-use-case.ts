import { CategoryId } from "../../domain/value-objects/category-id/category-id";
import { RegisterCategoryCommand } from "./register-category-command";
import { RegisterCategoryResult } from "./register-category-result";
import { CategoryName } from "../../domain/value-objects/category-name/category-name";
import { Category } from "../../domain/category";
import { CategoryRepository } from "../../domain/category-repository";
import { EnsureCategoryNameNotExists } from "../../domain/services/ensure-category-name-not-exists";
import { UserId } from "../../../users/domain/value-objects/user-id/user-id";
import { EnsureUserWithIdExists } from "../../../users/domain/services/ensure-user-with-id-exists";

export class RegisterCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly ensureCategoryNameNotExists: EnsureCategoryNameNotExists,
        private readonly ensureUserWithIdExists: EnsureUserWithIdExists
    ) {}

    execute(command: RegisterCategoryCommand): RegisterCategoryResult {
        const categoryId = new CategoryId();
        const categoryName = new CategoryName(command.name);
        const userId = new UserId(command.userId);

        this.ensureCategoryNameNotExists.execute(categoryName);
        this.ensureUserWithIdExists.execute(userId);

        const category = new Category(categoryId, categoryName, userId);

        this.categoryRepository.create(category);

        return new RegisterCategoryResult(category.id().value(), category.name().value(), category.userId().value());
    }

}