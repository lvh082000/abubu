import {Input} from 'components/FormControls';
import {toStringPrice} from 'services/UtilService';
import React from 'react';
import {t} from 'styles/shared';

export const MoneyHaveToPay = ({total}: {total: number}) => {
  return (
    <Input
      editable={false}
      label="Khách cần trả"
      value={toStringPrice(total)}
      widgetStyles={{input: t.textRight}}
    />
  );
};
