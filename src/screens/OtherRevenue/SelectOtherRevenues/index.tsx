import AddButton from 'components/AddButton';
import {GradientHeader} from 'components/Header';
import {PrimarySearchBar} from 'components/SearchBar';
import {
  useAppDispatch,
  useAppSelector,
  useThunkStatusAction,
} from 'hooks/useRedux';
import {
  OtherRevenueScreenID,
  OtherRevenueStackParams,
} from 'navigation/OtherRevenueNavigation';
import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {GetLocationsPrefix} from 'store/Product';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';
import {fetchDeleteOrtherRevenue, OtherRevenuesSelector} from 'store/Order';
import {OtherRevenueType} from 'types/Properties';
import {SelectOtherRevenueItem} from './components/SelectOtherRevenueItem';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<
    OtherRevenueStackParams,
    OtherRevenueScreenID.SelectOtherRevenues
  >;
}

const SelectOtherRevenues = ({route: {params}}: Props) => {
  const data = useAppSelector(OtherRevenuesSelector());
  const {isLoading} = useThunkStatusAction(GetLocationsPrefix);
  const dispatch = useAppDispatch();
  const selectedData = useRef<OtherRevenueType[]>([]);

  const goBack = useCallback(() => {
    NavigationService.goBack(1, {result: selectedData.current});
  }, []);

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(
      OtherRevenueScreenID.CreateOrUpdateOtherRevenue,
    );
  }, []);

  const onEdit = useCallback(
    (id: number) => {
      const item = data.find(v => v.id === id);
      NavigationService.pushToScreen(
        OtherRevenueScreenID.CreateOrUpdateOtherRevenue,
        item,
      );
    },
    [data],
  );

  const onDelete = useCallback((id: number) => {
    dispatch(fetchDeleteOrtherRevenue(id));
  }, []);

  const onCheck = useCallback(
    ({id, value}: {id: number; value: boolean}) => {
      if (value) {
        const item = data.find(v => v.id === id) as OtherRevenueType;
        selectedData.current = [...selectedData.current, item];
      } else {
        selectedData.current = selectedData.current.filter(v => v.id !== id);
      }
    },
    [data],
  );

  useEffect(() => {
    if (params && params.values.length > 0) {
      selectedData.current = params.values.map(
        id => data.find(v => v.id === id) as OtherRevenueType,
      );
    }
  }, [params, data]);

  const renderItem = (item: OtherRevenueType, index: number) => {
    const checked = !!params && !!params.values.find(v => v === item.id);
    return (
      <SelectOtherRevenueItem
        item={item}
        key={index}
        onEdit={onEdit}
        onDelete={onDelete}
        onCheck={onCheck}
        checked={checked}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (data.length > 0) {
      return (
        <>
          <PrimarySearchBar placeholder="Tìm kiếm" />
          <View style={[l.flex, l.mt30]}>{data.map(renderItem)}</View>
        </>
      );
    }
    if (data.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Chọn loại thu"
        goBack={goBack}
      />
      {renderContent()}
      <AddButton onPress={onAdd} />
    </View>
  );
};

export default SelectOtherRevenues;
