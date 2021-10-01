import {toNumberPrice} from 'services/UtilService';
import * as Yup from 'yup';
import {AnyObject, Maybe} from 'yup/lib/types';

Yup.addMethod(Yup.StringSchema, 'integer', function () {
  return this.matches(/^\d+$/, 'Số lượng không hợp lệ');
});

Yup.addMethod(Yup.StringSchema, 'currency', function () {
  const regex = /^(?:\d{1,3}(?:,\d{3})+|\d+)/;
  return this.matches(regex, 'Số tiền không hợp lệ');
});

Yup.addMethod(Yup.StringSchema, 'maxCurrency', function (max) {
  return this.test('maxCurrency', `Số tiền phải nhỏ hơn ${max}`, value => {
    const num = value ? toNumberPrice(value) : 0;
    return max >= num;
  });
});

Yup.addMethod(Yup.StringSchema, 'phone', function () {
  return this.test('phone', `Số điện thoại không hợp lệ`, value => {
    return !!value && value.startsWith('0') && value.trim().length === 10;
  });
});

declare module 'Yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends Yup.BaseSchema<TType, TContext, TOut> {
    integer(): StringSchema<TType, TContext>;
    currency(): StringSchema<TType, TContext>;
    maxCurrency(max: number): StringSchema<TType, TContext>;
    phone(): StringSchema<TType, TContext>;
  }

  //   interface NumberSchema<
  //     TType extends Maybe<number> = number | undefined,
  //     TContext extends AnyObject = AnyObject,
  //     TOut extends TType = TType,
  //   > extends Yup.BaseSchema<TType, TContext, TOut> {
  //     emptyAsUndefined(): NumberSchema<TType, TContext>;
  //   }
}

export const YupExtended = Yup;
