import {RouteProp} from '@react-navigation/native';
import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useSpinner} from 'components/Spinner';
import {
  ProductScreenID,
  ProductStackParams,
  ProductTabScreenID,
} from 'navigation/ProductNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {cloneDeep} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {ProductIntentoryItem} from 'types/Properties';
import ListCheck from '../components/ListCheck';
import {useGetProductsForInventory} from './hook/useInitialData';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.CheckProduct>;
}

const CheckProduct = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const {isLoading, products, setProducts} = useGetProductsForInventory(
    params.productIds,
  );

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Product,
      params: {
        screen: ProductTabScreenID.InventoryControl,
      },
    });
  };

  const onTemporary = useCallback(async () => {
    await save(false);
  }, [products]);

  const onResult = useCallback(
    (data: {id: number; value: number}) => {
      const _products: Array<ProductIntentoryItem> = cloneDeep(products);
      const item = _products.find(v => v.id === data.id);

      if (item) {
        item.actual = data.value;
        setProducts(_products);
      }
    },
    [products],
  );

  const save = async (isDone: boolean) => {
    try {
      spinner.show();
      const data = products.map(v => {
        return {
          id: v.id,
          actual: v.actual,
        };
      });

      await ProductService.fetchCreateOrUpdateInventory({
        isDone,
        products: data,
      });

      dialog.show({
        type: 'Success',
        message: isDone ? 'Ki???m kho th??nh c??ng' : '???? l??u kho t???m',
        onModalConfirm: handleBack,
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateOrUpdateInventory', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onComplete = useCallback(() => {
    dialog.show({
      type: 'Confirmation',
      message: `Vi???c ho??n th??nh ki???m kho s??? thay ?????i t???n kho hi???n t???i c???a h??ng ho?? trong phi???u ki???m kho. 
      B???n c?? ch???c ch???n mu???n thay ?????`,
      onModalConfirm: async () => {
        await save(true);
      },
    });
  }, [products]);

  const onDeleteItem = useCallback(
    (product: ProductIntentoryItem) => {
      const newArr = products.filter(v => v.id !== product.id);
      setProducts(newArr);
    },
    [products],
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (products.length > 0) {
      return (
        <ListCheck
          onTemporary={onTemporary}
          onComplete={onComplete}
          products={products}
          onResult={onResult}
          onDeleteItem={onDeleteItem}
        />
      );
    }
    return null;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="M?? t??? v??? m??n h??nh n??y"
        useBack
        title="Ki???m tra s???n ph???m"
      />
      {renderContent()}
    </View>
  );
};

export default CheckProduct;
