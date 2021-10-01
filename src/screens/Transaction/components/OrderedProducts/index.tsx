import React, {useEffect, useRef} from 'react';
import {cloneDeep} from 'services/UtilService';
import SelectedProducts from './SelectedProducts';
import {SelectedProductType} from 'types/Properties';

interface Props {
  data: Array<SelectedProductType>;
  onQuantityChange?: (products: Array<SelectedProductType>) => void;
}

const OrderedProducts = React.memo(({data, onQuantityChange}: Props) => {
  const cloneDataRef = useRef<SelectedProductType[]>([]);

  const _onQuantityChange = (value: number, index: number) => {
    //@ts-ignore
    cloneDataRef.current[index].quantity = value;
    onQuantityChange?.(cloneDataRef.current);
  };

  useEffect(() => {
    cloneDataRef.current = cloneDeep(data);
  }, [data]);

  return <SelectedProducts onQuantityChange={_onQuantityChange} data={data} />;
});

export default OrderedProducts;
