import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {TransactionScreenID} from 'navigation/TransactionNavigation';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {OrderStatusType, OrderType, PermissionType} from 'types/Properties';
import {
  FetchGetOrdersResponse,
  OrderItemType,
} from 'types/Responses/FetchGetOrdersResponse';
import OrderSoldItem from './components/OrderSoldItem';
import FastReturnButton from './components/FastReturnButton';
import {l} from 'styles/shared';
import {RootScreenID} from 'navigation/types';

const ListOfSoldOrders = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(
    PermissionType.TransactionRO,
  );

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      startTimestamp: 1,
      endTimestamp: 1,
      type: -1,
      status: OrderStatusType.Done,
    },
  });

  const {data, isLoading, refreshing, isLoadingMore, onRefresh, onEndReached} =
    useDataLoader<FetchGetOrdersResponse>(
      hasReadOnlyPermission as boolean,
      OrderService.fetchGetOrders,
      filterParams,
    );

  const onItemPress = useCallback((item: OrderItemType) => {
    NavigationService.pushToScreen(
      TransactionScreenID.CreateReturnProduct,
      item,
    );
  }, []);

  const onSelectDate = useCallback(dates => {
    setFilterParams({
      ...filterParams,
      extraFilterParams: {
        startTimestamp: dates.start,
        endTimestamp: dates.end,
        type: -1,
        status: OrderStatusType.Done,
      },
    });
  }, []);

  const onFastReturn = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Transaction, {
      screen: TransactionScreenID.CreateOrder,
      params: {type: OrderType.Return},
    });
  }, []);

  const renderItem = ({item, index}: {item: OrderItemType; index: number}) => {
    //@ts-ignore
    if (item.refund) {
      return null;
    }
    return <OrderSoldItem key={index} item={item} onItemPress={onItemPress} />;
  };

  const renderContent = () => {
    if (!hasReadOnlyPermission) {
      return <ErrorView message="Bạn không có quyền để xem mục này!" />;
    }
    if (isLoading) {
      return <LoadingView />;
    }
    if (data) {
      return (
        <CustomFlatList
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: OrderItemType) => item.id.toString()}
          data={data as any}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          isLoadingMore={isLoadingMore}
        />
      );
    }
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Trả hàng"
        useBack
      />
      {hasReadOnlyPermission && (
        <>
          <PrimarySearchBar />
          <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
            <DateFilter onSelect={onSelectDate} />
            <FastReturnButton onPress={onFastReturn} />
          </View>
        </>
      )}
      {renderContent()}
    </View>
  );
};

export default ListOfSoldOrders;
