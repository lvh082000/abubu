import {RouteProp} from '@react-navigation/native';
import CustomerOrderDetails from 'components/CustomerOrderDetails';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, ScrollView} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c, l} from 'styles/shared';
import {OrderType, SelectedProductType} from 'types/Properties';
import OrderedProducts from '../components/OrderedProducts';
import {OrderInfoRow} from '../components/OrderInfo';
import {useFetch} from 'hooks/useFetch';
import {OrderDetailsType} from 'types/Responses/FetchGetOrderDetailsResponse';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.CreateReturnProduct
  >;
}

const CreateReturnProduct = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const [total, setTotal] = useState<number>(params.totalPrice);
  const {data, isLoading} = useFetch<OrderDetailsType>(
    OrderService.fetchGetOrderDetails,
    {
      params: params.id,
    },
  );
  const [products, setProducts] = useState<SelectedProductType[]>([]);

  const title = useMemo(() => {
    switch (data?.type) {
      case OrderType.TakeAway:
        return 'Đơn trực tiếp';
      case OrderType.Shipping:
        return 'Đơn ship cod';
      case OrderType.BookByRoom:
        return 'Đơn bàn phòng';
    }
  }, [data?.type]);

  const onQuantityChange = useCallback(
    async (products: Array<SelectedProductType>) => {
      const item = products.find(v => v.quantity === 0);
      let data = products;
      if (item) {
        data = products.filter(v => v.quantity > 0);
        setProducts(data);
      }

      await fetchCalculateTotalPrice(data);
    },
    [data],
  );

  const fetchCalculateTotalPrice = async (products?: SelectedProductType[]) => {
    try {
      spinner.show();
      const total = await OrderService.fetchCalculateReturnProductTotalPrice({
        orderId: params.id,
        //@ts-ignore
        products,
      });
      setTotal(total);
    } catch (error) {
      console.log('[ERROR] fetchCalculateTotalPrice', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onSubmit = useCallback(() => {
    NavigationService.replace(TransactionScreenID.ReturnProductCheckout, {
      ...params,
      orderId: params.id,
      products,
    });
  }, [products]);

  useEffect(() => {
    const products = data?.products.map(v => {
      return {
        ...v,
        inStock: v.quantity,
      };
    });
    setProducts(products as SelectedProductType[]);
  }, [data?.products.length]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return null;
    }

    return (
      <ScrollView bounces={false} style={l.flex}>
        <CustomerOrderDetails
          customer={params.guestName}
          description={`${title} ${toFormatDate(params.createdAt)}`}
        />

        {products.length > 0 && (
          <>
            <OrderedProducts
              onQuantityChange={onQuantityChange}
              data={products}
            />

            <View style={[{backgroundColor: c.grey100}, l.pt30]}>
              <View style={[{backgroundColor: c.white}]}>
                <OrderInfoRow
                  title="Tổng giá lúc mua"
                  value={toStringPrice(total)}
                />
              </View>
            </View>

            <GradientButton
              title="THANH TOÁN"
              widgetStyles={{container: [l.mt30, l.mb20, l.mx20]}}
              onPress={onSubmit}
            />
          </>
        )}
        {products.length === 0 && (
          <NoDataView title="Không có sản phẩm nào cần trả" />
        )}
      </ScrollView>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Tạo phiếu trả hàng"
        useBack
      />
      {renderContent()}
    </View>
  );
};

export default CreateReturnProduct;
