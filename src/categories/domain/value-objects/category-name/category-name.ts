import { CategoryNameEmptyException } from "../../exceptions/category-name-empty-exception";
import { CategoryNameInvalidLengthException } from "../../exceptions/category-name-invalid-length-exception";

export class CategoryName {

  static MIN_LENGTH = 1;
  static MAX_LENGTH = 50;

  private readonly _value: string;

  constructor(value: string) {
    this.validateOrThrow(value);
    this._value = value;
  }

  private validateOrThrow(value: string) {
    if (value == '') {
      throw new CategoryNameEmptyException();
    }

    if (!(value.length >= CategoryName.MIN_LENGTH && value.length <= CategoryName.MAX_LENGTH)) {
      throw new CategoryNameInvalidLengthException();
    }
  }

  public value(): string {
    return this._value;
  }

}