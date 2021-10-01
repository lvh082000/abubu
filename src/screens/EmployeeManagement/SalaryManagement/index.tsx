import AddButton from 'components/AddButton';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import {PrimarySearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {EmployeeManagementScreenID} from 'navigation/EmployeeManagementNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {EmployeeService} from 'services/EmployeeService';
import NavigationService from 'services/NavigationService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {SalaryItemType} from 'types/Responses/FetchGetSalaryListResponse';
import ListHeader from './components/ListHeader';
import {PayslipItem} from './components/PayslipItem';

const FILTER_OPTIONS = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

const SalaryManagement = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(
    PermissionType.PersonnelRO,
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
    refreshing,
    isLoadingMore,
    total,
    onRefresh,
    onEndReached,
  } = useDataLoader(
    hasReadOnlyPermission as boolean,
    EmployeeService.fetchGetSalaryList,
    filterParams,
  );

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.EmployeeManagement, {
      screen: EmployeeManagementScreenID.CreatePayslip,
    });
  }, []);

  const onItemPress = useCallback((item: SalaryItemType) => {}, []);

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

  const renderItem = ({item, index}: {item: SalaryItemType; index: number}) => {
    return <PayslipItem key={index} item={item} onItemPress={onItemPress} />;
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
        keyExtractor={(item: SalaryItemType) => item.id.toString()}
        data={data as any}
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
        <PrimarySearchBar
          filterOptions={FILTER_OPTIONS}
          onSelectFilter={onSelectFilter}
          onSubmitEditing={onSearch}
        />
      )}
      {renderContent()}
      {hasReadOnlyPermission && <AddButton onPress={onAdd} />}
    </View>
  );
};
export default SalaryManagement;
