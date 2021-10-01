import AddButton from 'components/AddButton';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {DateFilter} from 'components/Filters';
import LoadingView from 'components/LoadingView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {TransactionScreenID} from 'navigation/TransactionNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {
  FetchGetRefundListResponse,
  RefundItemType,
} from 'types/Responses/FetchGetRefundListResponse';
import ListHeader from './components/ListHeader';
import ReturnProductItem from './components/ReturnProductItem';

const FILTER_OPTIONS = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

const ReturnProduct = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(
    PermissionType.TransactionRO,
  );

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      startTimestamp: 1,
      endTimestamp: 1,
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
  } = useDataLoader<FetchGetRefundListResponse>(
    hasReadOnlyPermission as boolean,
    OrderService.fetchGetRefundList,
    filterParams,
  );

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Transaction, {
      screen: TransactionScreenID.ListOfSoldOrders,
    });
  }, []);

  const onItemPress = useCallback((item: RefundItemType) => {
    NavigationService.pushToScreen(RootScreenID.Transaction, {
      screen: TransactionScreenID.ReturnProductDetails,
      params: {id: item.id, code: item.code},
    });
  }, []);

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

  const onSearch = useCallback(
    (text: string) => {
      setFilterParams({
        ...filterParams,
        keyword: text,
      });
    },
    [filterParams],
  );

  const onSelectDate = useCallback(
    dates => {
      setFilterParams({
        ...filterParams,
        extraFilterParams: {
          startTimestamp: dates.start,
          endTimestamp: dates.end,
        },
      });
    },
    [filterParams],
  );

  const renderItem = ({item}: {item: RefundItemType}) => {
    return <ReturnProductItem item={item} onItemPress={onItemPress} />;
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
        keyExtractor={(item: RefundItemType) => item.id.toString()}
        data={data}
        ListHeaderComponent={<ListHeader total={total as number} />}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        isLoadingMore={isLoadingMore}
      />
    );
  };

  return (
    <View style={ContainerStyles}>
      {hasReadOnlyPermission && (
        <>
          <PrimarySearchBar
            filterOptions={FILTER_OPTIONS}
            onSelectFilter={onSelectFilter}
            onSubmitEditing={onSearch}
          />
          <DateFilter onSelect={onSelectDate} />
        </>
      )}
      {renderContent()}
      {hasReadOnlyPermission && <AddButton onPress={onAdd} />}
    </View>
  );
};
export default ReturnProduct;
