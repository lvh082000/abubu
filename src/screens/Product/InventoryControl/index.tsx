import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {FetchGetInventoryParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {
  FetchGetInventoryListResponse,
  InventoryType,
} from 'types/Responses/FetchGetInventoryListResponse';
import {AddInventoryControl} from './components/AddButton';
import InventoryControlItem from './components/InventoryControlItem';

const FilterOptions = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

const InventoryControl = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.ProductRO);
  const [filterParams, setFilterParams] = useState<FetchGetInventoryParams>({
    keyword: '',
    sort: 'createdAt,desc',
  });
  const {data, isLoading, isLoadingMore, refreshing, onRefresh, onEndReached} =
    useDataLoader<FetchGetInventoryListResponse>(
      hasReadOnlyPermission as boolean,
      ProductService.fetchGetInventoryList,
      filterParams,
    );

  const onSelectFilter = useCallback(
    title => {
      const option = FilterOptions.find(v => v.title === title);
      setFilterParams({
        ...filterParams,
        sort: option?.id,
      });
    },
    [filterParams],
  );

  const onSearch = useCallback(
    (value: string) => {
      setFilterParams({
        ...filterParams,
        keyword: value,
      });
    },
    [filterParams],
  );

  const navigationDetailItem = useCallback((item: InventoryType) => {
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.TicketDetails,
      params: item,
    });
  }, []);

  const renderItem = ({item, index}: {item: InventoryType; index: number}) => {
    return (
      <InventoryControlItem
        index={index}
        item={item}
        onItemPress={navigationDetailItem}
      />
    );
  };

  const renderContent = () => {
    if (!hasReadOnlyPermission) {
      return <ErrorView message="Bạn không có quyền để xem mục này!" />;
    }
    if (isLoading) {
      return <LoadingView />;
    }
    if (data.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    if (data.length > 0) {
      return (
        <CustomFlatList
          isLoadingMore={isLoadingMore}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={renderItem}
          keyExtractor={(item: InventoryType) => item.id.toString()}
          data={data}
          onEndReached={onEndReached}
        />
      );
    }
  };

  return (
    <View style={ContainerStyles}>
      {hasReadOnlyPermission && (
        <PrimarySearchBar
          placeholder="Nhập theo tên , mã hàng"
          filterOptions={FilterOptions}
          onSelectFilter={onSelectFilter}
          onSubmitEditing={onSearch}
        />
      )}
      {renderContent()}
      {hasReadOnlyPermission && <AddInventoryControl />}
    </View>
  );
};

export default InventoryControl;
