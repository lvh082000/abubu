import AddButton from 'components/AddButton';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {DateFilter} from 'components/Filters';
import LoadingView from 'components/LoadingView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {PartnerScreenID} from 'navigation/PartnerNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {PartnerService} from 'services/PartnerService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PartnerType, PermissionType} from 'types/Properties';
import {
  FetchGetPartnersResponse,
  PartnerItemType,
} from 'types/Responses/FetchGetPartnersResponse';
import ListHeader from './components/ListHeader';
import {PartnerItem} from './components/PartnerItem';

const SEARCH_OPTIONS = [
  {id: 0, title: 'Tên khách hàng'},
  {id: 1, title: 'Mã đơn'},
];

const FILTER_OPTIONS = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

interface Props {
  type: PartnerType;
}

const Partners = ({type}: Props) => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.PartnerRO);

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      type: type,
      startTimestamp: 1,
      endTimestamp: 1,
    },
  });
  const {
    data,
    isLoading,
    refreshing,
    isLoadingMore,
    total,
    onRefresh,
    onEndReached,
  } = useDataLoader<FetchGetPartnersResponse>(
    hasReadOnlyPermission as boolean,
    PartnerService.fetchGetPartners,
    filterParams,
  );

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Partner, {
      screen: PartnerScreenID.CreatePartner,
      params: {type},
    });
  }, [type]);

  const onSelectFilter = useCallback((string: number | string) => {}, []);

  const onSelectSearch = useCallback((string: number | string) => {}, []);

  const onItemPress = useCallback(id => {
    NavigationService.pushToScreen(RootScreenID.Partner, {
      screen: PartnerScreenID.PartnerDetails,
      params: {id},
    });
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: PartnerItemType;
    index: number;
  }) => {
    return (
      <PartnerItem
        item={item}
        index={index}
        onItemPress={onItemPress}
        title={type === 'guest' ? 'Doanh thu bán' : 'Lần nhập gần nhất'}
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
      <CustomFlatList
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        isLoadingMore={isLoadingMore}
        refreshing={refreshing}
        renderItem={renderItem}
        keyExtractor={(item: PartnerItemType) => item.id.toString()}
        data={data}
        ListHeaderComponent={<ListHeader type={type} total={total as number} />}
      />
    );
  };

  return (
    <View style={ContainerStyles}>
      {hasReadOnlyPermission && (
        <>
          <PrimarySearchBar
            filterOptions={FILTER_OPTIONS}
            searchOptions={SEARCH_OPTIONS}
            onSelectFilter={onSelectFilter}
            onSelectSearch={onSelectSearch}
          />
          <DateFilter />
        </>
      )}
      {renderContent()}
      {hasReadOnlyPermission && <AddButton onPress={onAdd} />}
    </View>
  );
};
export default Partners;
