import AddButton from 'components/AddButton';
import {CustomFlatList} from 'components/CustomScrollableView';
import {useDialog} from 'components/Dialog';
import {ProductItem} from 'components/ListItems';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';
import ErrorView from 'components/ErrorView';
import {PrimarySearchBar} from 'components/SearchBar';
import Constants from 'config/Constants';
import {useDataLoader} from 'hooks/useDataLoader';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {ProfileService} from 'services/ProfileService';
import {GetCurrentStore} from 'store/Me';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {
  FetchGetProductsResponse,
  ProductItemType,
} from 'types/Responses/FetchGetProductsResponse';
import ListHeader from './components/ListHeader';

const Products = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.ProductRO);

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
  });
  const {
    data,
    isLoading,
    total,
    refreshing,
    restData,
    onRefresh,
    onEndReached,
    isLoadingMore,
  } = useDataLoader<FetchGetProductsResponse>(
    hasReadOnlyPermission as boolean,
    ProductService.fetchGetProducts,
    filterParams,
  );

  const currentStore = GetCurrentStore();
  const dialog = useDialog();

  const onAdd = useCallback(() => {
    if (!currentStore) {
      dialog.show({
        type: 'Error',
        message:
          'Cửa hàng chưa được thiết lập hoặc chưa được chọn. Vui lòng kiểm tra lại',
      });
      return;
    }
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.CreateOrUpdateProduct,
    });
  }, []);

  const onSelectFilter = useCallback(
    title => {
      const option = Constants.FilterOptions.find(v => v.title === title);
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

  const onItemPress = useCallback((item: ProductItemType) => {
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.CreateOrUpdateProduct,
      params: item,
    });
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItemType;
    index: number;
  }) => {
    return <ProductItem item={item} index={index} onItemPress={onItemPress} />;
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
          keyExtractor={(item: ProductItemType) => item.id.toString()}
          data={data}
          ListHeaderComponent={
            <ListHeader
              quatity={restData.productQuantity}
              total={total as number}
            />
          }
          onEndReached={onEndReached}
        />
      );
    }
  };

  return (
    <View style={ContainerStyles}>
      {hasReadOnlyPermission && (
        <PrimarySearchBar
          placeholder="Nhập theo tên, mã hàng"
          filterOptions={Constants.FilterOptions}
          onSelectFilter={onSelectFilter}
          onSubmitEditing={onSearch}
        />
      )}
      {renderContent()}
      {hasReadOnlyPermission && <AddButton onPress={onAdd} />}
    </View>
  );
};

export default Products;
