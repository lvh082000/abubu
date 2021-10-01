import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import {useDataLoader} from 'hooks/useDataLoader';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {
  FetchGetProductsResponse,
  ProductItemType,
} from 'types/Responses/FetchGetProductsResponse';
import Header from './components/Header';
import PriceItem from './components/PriceItem';

const PriceSetting = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.ProductRO);

  const [filterParams, setFilterParams] = useState<RequestParams>({
    extraFilterParams: {
      priceSetting: -1,
    },
  });

  const {data, isLoading, refreshing, onRefresh, onEndReached, isLoadingMore} =
    useDataLoader<FetchGetProductsResponse>(
      hasReadOnlyPermission as boolean,
      ProductService.fetchGetProducts,
      filterParams,
    );

  const navigationChoosePriceList = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.ChoosePriceList,
      params: {
        resultCallback: (data: {result: number}) => {
          setFilterParams({
            extraFilterParams: {
              priceSetting: data.result,
            },
          });
        },
        priceSetting: filterParams.extraFilterParams?.priceSetting,
        useActions: true,
      },
    });
  }, [filterParams]);

  const renderItem = (item: ProductItemType) => {
    return (
      <PriceItem
        item={item}
        value={filterParams?.extraFilterParams?.priceSetting as number}
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
    return (
      <>
        <Header
          //@ts-ignore
          value={filterParams.extraFilterParams.priceSetting}
          onPress={navigationChoosePriceList}
        />
        <CustomFlatList
          data={data}
          refreshing={refreshing}
          isLoadingMore={isLoadingMore}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item: ProductItemType) => item.id.toString()}
        />
      </>
    );
  };

  return <View style={ContainerStyles}>{renderContent()}</View>;
};

export default PriceSetting;
