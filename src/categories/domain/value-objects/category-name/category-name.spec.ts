import { CategoryNameEmptyException } from '../../exceptions/category-name-empty-exception';
import { CategoryNameInvalidLengthException } from '../../exceptions/category-name-invalid-length-exception';
import { CategoryName } from './category-name';

describe('CategoryName Value Object', () => {

  it('should create a new CategoryName', () => {
    expect(new CategoryName('Hogar y limpieza'))
    .toEqual({_value: 'Hogar y limpieza'});
  });

  it('should throw CategoryNameEmptyException', () => {
    expect(() => new CategoryName(''))
    .toThrow(new CategoryNameEmptyException())
  });

  it('should throw CategoryNameInvalidLengthException, max is 50', () => {
    expect(() => new CategoryName('123456789012345678901234567890123456789012345678901'))
    .toThrow(new CategoryNameInvalidLengthException())
  });

});