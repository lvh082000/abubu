import {RouteProp} from '@react-navigation/native';
import AddButton from 'components/AddButton';
import {Radio} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';
import {RightItemActionButtons} from 'components/RightItemActionButtons';
import {
  useAppDispatch,
  useAppSelector,
  useThunkStatusAction,
} from 'hooks/useRedux';
import {CashBookScreenID} from 'navigation/CashBookNavigation';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {SharedScreenID, SharedStackParams} from 'navigation/SharedNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {fetchDeleteReceiptType, ReceiptTypesSelector} from 'store/CashBook';
import {
  BrandsSelector,
  CategoriesSelector,
  fetchDeleteBrand,
  fetchDeleteCategory,
  fetchDeleteLocation,
  fetchDeleteProperty,
  GetCategoriesPrefix,
  LocationsSelector,
  PropertiesSelector,
} from 'store/Product';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {CashBookReceiptType, SelectSharedItemType} from 'types/Properties';

interface Props {
  route: RouteProp<SharedStackParams, SharedScreenID.SelectItem>;
}

const SelectItem = ({route: {params}}: Props) => {
  const receiptTypes = useAppSelector(ReceiptTypesSelector());
  const categories = useAppSelector(CategoriesSelector());
  const locations = useAppSelector(LocationsSelector());
  const properties = useAppSelector(PropertiesSelector());
  const brands = useAppSelector(BrandsSelector());
  const {isLoading} = useThunkStatusAction(GetCategoriesPrefix);
  const dispatch = useAppDispatch();
  const data = useMemo(() => {
    switch (params.type) {
      case SelectSharedItemType.Category:
        return categories;
      case SelectSharedItemType.Brand:
        return brands;
      case SelectSharedItemType.Location:
        return locations;
      case SelectSharedItemType.Property:
        return properties;
      case SelectSharedItemType.InputReceipt:
        return receiptTypes.filter(v => v.type === CashBookReceiptType.Input);
      case SelectSharedItemType.OutputReceipt:
        return receiptTypes.filter(v => v.type === CashBookReceiptType.Output);
    }
  }, [categories, locations, properties, brands, receiptTypes]);
  const options = useMemo(() => {
    return data.map(v => {
      return {
        title: v.name,
        value: v.id,
      };
    });
  }, [data]);
  console.log('data', options);
  const initialValue = useMemo(() => {
    return data.find(v => v.id === parseInt(params.value));
  }, [data]);
  const title = useMemo(() => {
    switch (params.type) {
      case SelectSharedItemType.Category:
        return 'nhóm hàng';
      case SelectSharedItemType.Brand:
        return 'thương hiệu';
      case SelectSharedItemType.Location:
        return 'vị trí';
      case SelectSharedItemType.Property:
        return 'thuộc tính';
      case SelectSharedItemType.InputReceipt:
        return 'loại thu';
      case SelectSharedItemType.OutputReceipt:
        return 'loại chi';
    }
  }, []);

  const handelNavigate = (navigationParams: Record<string, any>) => {
    switch (params.type) {
      case SelectSharedItemType.Category:
      case SelectSharedItemType.Brand:
      case SelectSharedItemType.Location:
      case SelectSharedItemType.Property:
        NavigationService.forcePushScreen(RootScreenID.Product, {
          screen: ProductScreenID.CreateOrUpdateProp,
          params: navigationParams,
        });
        break;
      case SelectSharedItemType.InputReceipt:
      case SelectSharedItemType.OutputReceipt:
        NavigationService.forcePushScreen(RootScreenID.CashBook, {
          screen: CashBookScreenID.CreateOrUpdateReceiptType,
          params: {
            ...navigationParams,
            type:
              params.type === SelectSharedItemType.InputReceipt
                ? CashBookReceiptType.Input
                : CashBookReceiptType.Output,
          },
        });
        break;
    }
  };

  const onAdd = useCallback(() => {
    handelNavigate({
      type: params.type,
      title: title,
    });
  }, [title]);

  const onEdit = useCallback(
    index => {
      handelNavigate({
        type: params.type,
        title: title,
        value: data[index],
      });
    },
    [data, title],
  );

  const onDelete = useCallback(
    index => {
      const item = data[index];
      switch (params.type) {
        case SelectSharedItemType.Category:
          dispatch(fetchDeleteCategory(item.id));
          break;
        case SelectSharedItemType.Brand:
          dispatch(fetchDeleteBrand(item.id));
          break;
        case SelectSharedItemType.Location:
          dispatch(fetchDeleteLocation(item.id));
          break;
        case SelectSharedItemType.Property:
          dispatch(fetchDeleteProperty(item.id));
          break;
        case SelectSharedItemType.InputReceipt:
        case SelectSharedItemType.OutputReceipt:
          dispatch(fetchDeleteReceiptType(item.id));
          break;
      }
    },
    [data],
  );

  const onSelectValue = useCallback(
    value => {
      if (value) {
        const current = data.find(v => v.id === value);
        NavigationService.goBack(1, {result: current});
      }
    },
    [data],
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (options.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <View style={ContainerStyles}>
        <Radio
          value={initialValue?.id ?? undefined}
          onChangeValue={onSelectValue}
          widgetStyles={{
            container: [l.mx20, l.mt30],
            option: [l.justifyBtw],
          }}
          type="square"
          options={options}
          rightComponent={index => (
            <RightItemActionButtons
              onEdit={onEdit}
              onDelete={onDelete}
              index={index}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Chọn ${title}`}
      />
      {renderContent()}
      <AddButton onPress={onAdd} />
    </View>
  );
};

export default SelectItem;
