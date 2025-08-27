import { Category } from "./category";
import { CategoryName } from "./value-objects/category-name/category-name";

export interface CategoryRepository {

    create(category: Category): Category;

    findByName(categoryName: CategoryName): Category | null;

}