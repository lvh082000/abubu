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
        message: isDone ? 'Kiểm kho thành công' : 'Đã lưu kho tạm',
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
      message: `Việc hoàn thành kiểm kho sẽ thay đổi tồn kho hiện tại của hàng hoá trong phiếu kiểm kho. 
      Bạn có chắc chắn muốn thay đổ`,
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
        description="Mô tả về màn hình này"
        useBack
        title="Kiểm tra sản phẩm"
      />
      {renderContent()}
    </View>
  );
};

export default CheckProduct;
