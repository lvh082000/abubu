import {RouteProp} from '@react-navigation/native';
import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import {HeaderSearchBar} from 'components/SearchBar';
import {useDataLoader} from 'hooks/useDataLoader';
import {EmployeeManagementScreenID} from 'navigation/EmployeeManagementNavigation';
import {PartnerScreenID} from 'navigation/PartnerNavigation';
import {SharedScreenID, SharedStackParams} from 'navigation/SharedNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {EmployeeService} from 'services/EmployeeService';
import NavigationService from 'services/NavigationService';
import {PartnerService} from 'services/PartnerService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType, SelectSharedPersonType} from 'types/Properties';
import {
  FetchGetPersonResponseType,
  PersonItemType,
} from 'types/Responses/FetchGetPersonResponseType';
import {PersonItem} from './components/PersonItem';
import {SelectedButton} from './components/SelectButton';

interface Props {
  route: RouteProp<SharedStackParams, SharedScreenID.SelectPerson>;
}

const SelectPerson = ({route: {params}}: Props) => {
  const hasReadOnlyPermission = useMemo(() => {
    switch (params.type) {
      case SelectSharedPersonType.Customer:
      case SelectSharedPersonType.Provider:
        return ProfileService.canIDo([
          PermissionType.PartnerRO,
          PermissionType.PartnerRW,
        ]);
      case SelectSharedPersonType.Employee:
        return ProfileService.canIDo([
          PermissionType.PersonnelRO,
          PermissionType.PersonnelRW,
        ]);
    }
  }, [params.type]);
  const type = useMemo(() => {
    switch (params.type) {
      case SelectSharedPersonType.Customer:
        return 'guest';
      case SelectSharedPersonType.Provider:
        return 'provider';
      case SelectSharedPersonType.Employee:
        return 'employee';
    }
  }, []);
  const fetchAction = useMemo(() => {
    switch (params.type) {
      case SelectSharedPersonType.Customer:
      case SelectSharedPersonType.Provider:
        return PartnerService.fetchGetPartners;
      case SelectSharedPersonType.Employee:
        return EmployeeService.fetchGetEmployees;
    }
  }, [params.type]);
  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      type: type,
    },
  });

  const {
    data,
    isLoading,
    refreshing,
    isLoadingMore,
    onRefresh,
    onEndReached,
    reload,
  } = useDataLoader<{data: FetchGetPersonResponseType}>(
    hasReadOnlyPermission as boolean,
    fetchAction,
    filterParams,
  );
  const [selectedId, setSelectId] = useState<number | undefined>(undefined);

  const onItemPress = useCallback(
    (value: PersonItemType) => {
      if (value.id === selectedId) {
        setSelectId(undefined);
      } else {
        setSelectId(value.id);
      }
    },
    [selectedId],
  );

  const dismiss = useCallback(() => {
    if (selectedId) {
      const value = data.find(v => v.id === selectedId) as PersonItemType;
      NavigationService.goBack(1, {result: value});
    } else {
      NavigationService.goBack();
    }
  }, [selectedId, data]);

  useEffect(() => {
    reload();
  }, []);

  const onSearch = useCallback(text => {
    setFilterParams({
      keyword: text,
      sort: 'createdAt,desc',
      extraFilterParams: {
        type: type,
      },
    });
  }, []);

  const onSelectedButtonPress = useCallback(() => {
    if (selectedId) {
      dismiss();
    } else {
      dismiss();
      setTimeout(() => {
        if (params.type === SelectSharedPersonType.Employee) {
          NavigationService.pushToScreen(RootScreenID.EmployeeManagement, {
            screen: EmployeeManagementScreenID.CreateEmployee,
            params: {
              useBack: true,
            },
          });
        } else {
          NavigationService.pushToScreen(RootScreenID.Partner, {
            screen: PartnerScreenID.CreatePartner,
            params: {
              type,
              useBack: true,
            },
          });
        }
      }, 300);
    }
  }, [selectedId]);

  useEffect(() => {
    setFilterParams({
      keyword: '',
      sort: 'createdAt,desc',
      extraFilterParams: {
        type: type,
      },
    });
  }, [type]);

  const renderItem = ({item}: {item: PersonItemType}) => {
    const isSelected = selectedId === item.id;

    return (
      <PersonItem
        isSelected={isSelected}
        onItemPress={onItemPress}
        item={item}
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
        <CustomFlatList
          renderItem={renderItem}
          keyExtractor={(item: PersonItemType) => item.id.toString()}
          data={data}
          refreshing={refreshing}
          isLoadingMore={isLoadingMore}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
        />
        {data.length > 0 && (
          <SelectedButton
            isSelected={!!selectedId}
            onPress={onSelectedButtonPress}
          />
        )}
      </>
    );
  };

  return (
    <View style={ContainerStyles}>
      <HeaderSearchBar onSubmitEditing={onSearch} onClose={dismiss} />
      {renderContent()}
    </View>
  );
};

export default SelectPerson;
