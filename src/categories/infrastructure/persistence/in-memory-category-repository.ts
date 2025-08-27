import { Category } from "../../domain/category";
import { CategoryRepository } from "../../domain/category-repository";
import { CategoryName } from "../../domain/value-objects/category-name/category-name";

export class InMemoryCategoryRepository implements CategoryRepository {

    private categories: Category[] = []

    create(category: Category): Category {
        this.categories.push(category);
        return category;
    }

    findByName(categoryName: CategoryName): Category | null {
        for (const category of this.categories) {
            if(category.name().value() === categoryName.value()) {
                return category;
            }
        }

        return null;
    }

    clear(): void {
        this.categories = [];
    }

}