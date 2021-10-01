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
import {
  ProductScreenID,
  ProductStackParams,
} from 'navigation/ProductNavigation';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
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
import {ProductPropType} from 'types/Properties';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.SelectProps>;
}

const SelectProps = ({route: {params}}: Props) => {
  const categories = useAppSelector(CategoriesSelector());
  const locations = useAppSelector(LocationsSelector());
  const properties = useAppSelector(PropertiesSelector());
  const brands = useAppSelector(BrandsSelector());
  const {isLoading} = useThunkStatusAction(GetCategoriesPrefix);
  const dispatch = useAppDispatch();
  const data = useMemo(() => {
    switch (params.type) {
      case ProductPropType.Category:
        return categories;
      case ProductPropType.Brand:
        return brands;
      case ProductPropType.Location:
        return locations;
      case ProductPropType.Property:
        return properties;
      default:
        return [];
    }
  }, [categories, locations, properties, brands]);
  const options = useMemo(() => {
    return data?.map(v => {
      return {
        title: v.name,
        value: v.id,
      };
    });
  }, [data]);
  const initialValue = useMemo(() => {
    return data.find(v => v.id === parseInt(params.value));
  }, [data]);
  const title = useMemo(() => {
    switch (params.type) {
      case ProductPropType.Category:
        return 'nhóm hàng';
      case ProductPropType.Brand:
        return 'thương hiệu';
      case ProductPropType.Location:
        return 'vị trí';
      case ProductPropType.Property:
        return 'thuộc tính';
    }
  }, []);

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(ProductScreenID.CreateOrUpdateProp, {
      type: params.type,
      title: title,
    });
  }, [title]);

  const onEdit = useCallback(
    index => {
      NavigationService.pushToScreen(ProductScreenID.CreateOrUpdateProp, {
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
        case ProductPropType.Category:
          dispatch(fetchDeleteCategory(item.id));
          break;
        case ProductPropType.Brand:
          dispatch(fetchDeleteBrand(item.id));
          break;
        case ProductPropType.Location:
          dispatch(fetchDeleteLocation(item.id));
          break;
        case ProductPropType.Property:
          dispatch(fetchDeleteProperty(item.id));
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

export default SelectProps;
