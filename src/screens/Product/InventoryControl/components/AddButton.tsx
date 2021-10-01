import AddButton from 'components/AddButton';
import {
  SelectProductsProvider,
  useSelectProducts,
} from 'components/SelectProducts';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import NavigationService from 'services/NavigationService';

const Button = () => {
  const {show} = useSelectProducts();

  const onSelected = useCallback((productIds: Array<number>) => {
    if (productIds.length === 0) {
      return;
    }
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.CheckProduct,
      params: {productIds},
    });
  }, []);

  const onAddProducts = useCallback(() => {
    show({onSelected: onSelected});
  }, []);

  return <AddButton onPress={onAddProducts} />;
};

export const AddInventoryControl = React.memo(() => {
  return (
    <SelectProductsProvider>
      <Button />
    </SelectProductsProvider>
  );
});
