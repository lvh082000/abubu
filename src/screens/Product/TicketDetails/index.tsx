import {RouteProp} from '@react-navigation/native';
import {useDialog} from 'components/Dialog';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useSpinner} from 'components/Spinner';
import Text from 'components/Text';
import Dayjs from 'dayjs';
import {useFetch} from 'hooks/useFetch';
import {
  ProductScreenID,
  ProductStackParams,
  ProductTabScreenID,
} from 'navigation/ProductNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';
import {
  InventoryDetailsType,
  InventoryProductDetailsType,
} from 'types/Responses/FetchGetInventoryResponse';
import InventoryList from '../components/InventoryList';
import ListCheck from '../components/ListCheck';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.TicketDetails>;
}

const TicketDetails = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const [products, setProducts] = useState<Array<InventoryProductDetailsType>>(
    [],
  );

  const {data, isLoading} = useFetch<InventoryDetailsType>(
    ProductService.fetchGetInventory,
    {
      params: params.id,
    },
  );

  const onTemporary = useCallback(async () => {
    await save(false);
  }, [products]);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Product,
      params: {
        screen: ProductTabScreenID.InventoryControl,
      },
    });
  };

  const onResult = (data: {id: number; value: number}) => {
    const item = products.find(v => v.id === data.id);

    const arr: Array<InventoryProductDetailsType> = products.filter(
      v => v.id !== data.id,
    );

    if (item) {
      item.actual = data.value;
      setProducts([...arr, item]);
    }
  };

  const save = async (isDone: boolean) => {
    try {
      spinner.show();
      const products = data?.products.map(v => {
        return {
          id: v.id,
          actual: v.actual,
        };
      });

      await ProductService.fetchCreateOrUpdateInventory({
        isDone: isDone,
        products: products as Array<{
          id: number;
          actual: number;
        }>,
        id: params.id,
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

  const onCancel = useCallback(async () => {
    try {
      spinner.show();
      await ProductService.fetchDeleteInventory(params.id);
      dialog.show({
        type: 'Success',
        message: 'H???y ????n ki???m kho th??nh c??ng',
        onModalConfirm: handleBack,
      });
    } catch (error) {
      console.log('[ERROR] fetchDeleteInventory', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  useEffect(() => {
    setProducts(data?.products as Array<InventoryProductDetailsType>);
  }, [data?.products]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return null;
    }
    const products = data.products.map(v => {
      return {
        ...v,
        quantity: v.stock,
      };
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={l.flex}>
        <View style={[{backgroundColor: c.grey100}, l.pb20]}>
          <View style={[{backgroundColor: c.white}, l.px20, l.pb20]}>
            <View style={[l.mt20]}>
              <Text style={[t.h5, t.medium]}>
                Ng?????i c??n b???ng: {params.actorName}
              </Text>
              <Text style={[t.h5, t.medium]}>
                Th???i gian:{' '}
                {Dayjs(params.updateAt * 1000).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>

            <View style={[l.mt10]}>
              <Text style={[t.h5, t.medium]}>
                Ng?????i t???o: {params.actorName2}
              </Text>
              <Text style={[t.h5, t.medium]}>
                Th???i gian:{' '}
                {Dayjs(params.createdAt * 1000).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>

            {!!params.description && (
              <Text style={[l.mt10]}>{params.description}</Text>
            )}
          </View>
        </View>

        <View style={l.mt10}>
          {/* @ts-ignore */}
          {params.done ? (
            <InventoryList data={products as any} />
          ) : (
            <ListCheck
              onTemporary={onTemporary}
              onComplete={onComplete}
              products={products as any}
              onResult={onResult}
            />
          )}
          <View style={[l.mx20, l.pt10]}>
            <GradientButton
              onPress={onCancel}
              widgetStyles={{container: l.mb10}}
              variant="danger"
              title="H???Y"
            />
          </View>
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="M?? t??? v??? m??n h??nh n??y"
        useBack
        title={params.code}
      />
      {renderContent()}
    </View>
  );
};

export default TicketDetails;
