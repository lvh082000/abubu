import {RouteProp} from '@react-navigation/native';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {
  OrderPaymentStatusType,
  OrderType,
  PermissionType,
  ShippingOrderStatusType,
} from 'types/Properties';
import {
  FetchGetOrdersResponse,
  OrderItemType,
} from 'types/Responses/FetchGetOrdersResponse';
import ShippingItem from '../components/ShippingItem';
import ListHeader from './components/ListHeader';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ShippingStatusOrders
  >;
}

const SEARCH_OPTIONS = [
  {id: 0, title: 'Tên khách hàng'},
  {id: 1, title: 'Mã đơn'},
];

const FILTER_OPTIONS = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

const getPaymentStatus = (status: ShippingOrderStatusType) => {
  let paymentStatus = OrderPaymentStatusType.All;
  if (status === ShippingOrderStatusType.Paying) {
    paymentStatus = OrderPaymentStatusType.UnPay;
  }
  return paymentStatus;
};

const ShippingStatusOrders = ({route: {params}}: Props) => {
  const hasReadOnlyPermission = ProfileService.canIDo(
    PermissionType.TransactionRO,
  );

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      startTimestamp: 1,
      endTimestamp: 1,
      type: OrderType.Shipping,
      status: params.status,
      paymentStatus: getPaymentStatus(params.status),
    },
  });
  const {
    data,
    isLoading,
    total,
    refreshing,
    isLoadingMore,
    onRefresh,
    onEndReached,
  } = useDataLoader<FetchGetOrdersResponse>(
    hasReadOnlyPermission as boolean,
    OrderService.fetchGetOrders,
    filterParams,
  );

  const onSelectFilter = useCallback(
    title => {
      const option = FILTER_OPTIONS.find(v => v.title === title);
      setFilterParams({
        ...filterParams,
        sort: option?.id,
      });
    },
    [filterParams],
  );

  const onSelectSearch = useCallback((string: number | string) => {}, []);

  const onSelectDate = useCallback(
    dates => {
      setFilterParams({
        ...filterParams,
        extraFilterParams: {
          startTimestamp: dates.start,
          endTimestamp: dates.end,
          type: OrderType.Shipping,
          status: params.status,
          paymentStatus: getPaymentStatus(params.status),
        },
      });
    },
    [filterParams],
  );

  const onItemPress = useCallback((item: OrderItemType) => {
    NavigationService.pushToScreen(RootScreenID.Transaction, {
      screen: TransactionScreenID.ShippingOrderDetails,
      params: {
        id: item.id,
        code: item.code,
        status: item.status,
      },
    });
  }, []);

  const renderItem = ({item, index}: {item: OrderItemType; index: number}) => {
    return <ShippingItem onItemPress={onItemPress} item={item} index={index} />;
  };

  const renderContent = () => {
    if (!hasReadOnlyPermission) {
      return <ErrorView message="Bạn không có quyền để xem mục này!" />;
    }
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return null;
    }
    return (
      <CustomFlatList
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: OrderItemType) => item.id.toString()}
        data={data}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        isLoadingMore={isLoadingMore}
        ListHeaderComponent={
          <ListHeader name={params.title} total={total as number} />
        }
      />
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title={params.title}
        useBack
      />
      {hasReadOnlyPermission && (
        <>
          <PrimarySearchBar
            filterOptions={FILTER_OPTIONS}
            searchOptions={SEARCH_OPTIONS}
            onSelectFilter={onSelectFilter}
            onSelectSearch={onSelectSearch}
          />
          <DateFilter onSelect={onSelectDate} />
        </>
      )}
      {renderContent()}
    </View>
  );
};
export default ShippingStatusOrders;
