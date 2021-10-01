import AddButton from 'components/AddButton';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {EmployeeItem} from 'components/ListItems';
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
import {EmployeeType} from 'types/Responses/FetchGetEmployeesResponse';
import ListHeader from './components/ListHeader';

const FILTER_OPTIONS = [
  {id: 'createdAt,desc', title: 'Mới nhất'},
  {id: 'createdAt,asc', title: 'Cũ nhất'},
];

const Employees = () => {
  const hasReadOnlyPermission = ProfileService.canIDo(
    PermissionType.PersonnelRO,
  );

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
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
    EmployeeService.fetchGetEmployees,
    filterParams,
  );

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.EmployeeManagement, {
      screen: EmployeeManagementScreenID.CreateEmployee,
    });
  }, []);

  const onItemPress = useCallback((item: EmployeeType) => {
    NavigationService.pushToScreen(RootScreenID.EmployeeManagement, {
      screen: EmployeeManagementScreenID.EmployeeDetails,
      params: {id: item.id},
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

  const renderItem = ({item, index}: {item: EmployeeType; index: number}) => {
    return <EmployeeItem key={index} item={item} onItemPress={onItemPress} />;
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
        keyExtractor={(item: EmployeeType) => item.id.toString()}
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
export default Employees;
