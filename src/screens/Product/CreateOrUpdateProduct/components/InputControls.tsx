import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Input, Select, ToggleSwitch} from 'components/FormControls';
import {useFormikContext} from 'formik';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {RightButton} from './RightButton';
import {
  CreateOrUpdateProductFormValues as FormValues,
  ProductPropType,
} from 'types/Properties';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/Text';
import {l, t, c} from 'styles/shared';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {ProductMetaType} from 'types/Responses/FetchGetProductMetaResponse';
import {PlusIcon} from 'components/SharedIcons';
import CircleTouchable from 'components/CircleTouchable';
import {ProductPropertyType} from 'types/Params';
import {useAppSelector} from 'hooks/useRedux';
import {
  BrandsSelector,
  CategoriesSelector,
  LocationsSelector,
} from 'store/Product';
import {useDialog} from 'components/Dialog';

export const CodeInput = React.memo(() => {
  const {values, handleChange, setFieldValue} = useFormikContext<FormValues>();

  const onScan = useCallback(() => {
    NavigationService.pushToScreen(
      RootScreenID.QRCodeScanner,
      {},
      (data: {result: string}) => {
        setFieldValue('barcode', data.result, true);
      },
    );
  }, []);

  return (
    <Input
      onChangeText={handleChange('barcode')}
      value={values.barcode}
      label={'Mã vạch'}
      hint="Nhập hoặc quét mã vạch"
      rightComponent={<RightButton onPress={onScan} title="Quét" />}
    />
  );
});

export const SelectCategory = React.memo(() => {
  const categories = useAppSelector(CategoriesSelector());
  const {values, setFieldValue} = useFormikContext<FormValues>();
  const [displayText, setDisplayText] = useState('');

  const onSelect = useCallback(() => {
    NavigationService.pushToScreen(
      ProductScreenID.SelectProps,
      {
        value: values.groupId,
        type: ProductPropType.Category,
      },
      (data: {result: ProductMetaType}) => {
        setTimeout(() => {
          if (data.result) {
            setFieldValue('groupId', data.result.id);
            setDisplayText(data.result.name);
          } else {
            setFieldValue('groupId', '');
            setDisplayText('');
          }
        });
      },
    );
  }, [values.groupId]);

  useEffect(() => {
    if (values.groupId && categories.length > 0) {
      const category = categories.find(
        v => values.groupId && v.id === parseInt(values.groupId),
      );
      if (category) {
        setDisplayText(category.name);
      }
    }
  }, []);

  return (
    <Select
      value={values.groupId}
      label={'Nhóm hàng'}
      hint="Chọn nhóm hàng"
      onSelectPress={onSelect}
      displayText={displayText}
    />
  );
});

export const SelectBrand = React.memo(() => {
  const brands = useAppSelector(BrandsSelector());
  const {values, setFieldValue} = useFormikContext<FormValues>();
  const [displayText, setDisplayText] = useState('');

  const onSelect = useCallback(() => {
    NavigationService.pushToScreen(
      ProductScreenID.SelectProps,
      {
        value: values.brandId,
        type: ProductPropType.Brand,
      },
      (data: {result: ProductMetaType}) => {
        setTimeout(() => {
          if (data.result) {
            setFieldValue('brandId', data.result.id);
            setDisplayText(data.result.name);
          } else {
            setFieldValue('brandId', '');
            setDisplayText('');
          }
        });
      },
    );
  }, []);

  useEffect(() => {
    if (values.brandId && brands.length > 0) {
      const brand = brands.find(
        v => values.brandId && v.id === parseInt(values.brandId),
      );
      if (brand) {
        setDisplayText(brand.name);
      }
    }
  }, []);

  return (
    <Select
      value={values.brandId}
      label={'Thuơng hiệu'}
      hint="Chọn thương hiệu"
      onSelectPress={onSelect}
      displayText={displayText}
    />
  );
});

export const SelectLocation = React.memo(() => {
  const locations = useAppSelector(LocationsSelector());
  const {values, setFieldValue} = useFormikContext<FormValues>();
  const [displayText, setDisplayText] = useState('');

  const onSelect = useCallback(() => {
    NavigationService.pushToScreen(
      ProductScreenID.SelectProps,
      {
        value: values.locationId,
        type: ProductPropType.Location,
      },
      (data: {result: ProductMetaType}) => {
        setTimeout(() => {
          if (data.result) {
            setFieldValue('locationId', data.result.id);
            setDisplayText(data.result.name);
          } else {
            setFieldValue('locationId', '');
            setDisplayText('');
          }
        });
      },
    );
  }, []);

  useEffect(() => {
    if (values.locationId && locations.length > 0) {
      const location = locations.find(
        v => values.locationId && v.id === parseInt(values.locationId),
      );
      if (location) {
        setDisplayText(location.name);
      }
    }
  }, []);

  return (
    <Select
      value={values.locationId}
      label={'Vị trí'}
      hint="Chọn vị trí"
      onSelectPress={onSelect}
      displayText={displayText}
    />
  );
});

export const ToggleInput = React.memo(
  ({
    title,
    description,
    field,
    isDisabled,
  }: {
    title: string;
    description?: string | undefined;
    field: string;
    isDisabled?: boolean;
  }) => {
    const {values, setFieldValue} = useFormikContext<FormValues>();

    const onToggleChange = useCallback((value: boolean) => {
      setFieldValue(field, value);
    }, []);

    return (
      <View style={[l.flexRow, l.alignCtr, l.justifyBtw, l.mb20]}>
        <View>
          <Text>{title}</Text>
          {!!description && (
            <Text style={[t.pXS, {color: c.black200}]}>{description}</Text>
          )}
        </View>
        <ToggleSwitch
          isDisabled={isDisabled}
          handleOnPress={value => onToggleChange(value)}
          //@ts-ignore
          value={values[field]}
        />
      </View>
    );
  },
);

const DeleteButton = React.memo(({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[l.pt15]} activeOpacity={0.7}>
      <Text style={[{color: c.red800}, t.bold]}>Xóa</Text>
    </TouchableOpacity>
  );
});

const PropertyInput = React.memo(
  ({
    item,
    onChangeText,
    onDelete,
  }: {
    item: ProductPropertyType;
    onChangeText: (value: string, propId: number) => void;
    onDelete: (propId: number) => void;
  }) => {
    const [text, setText] = useState(item.attribute ?? '');

    const _onChangeText = useCallback(
      (text: string) => {
        setText(text);
        onChangeText(text, item.propId);
      },
      [onChangeText],
    );

    const _onDelete = useCallback(() => {
      onDelete(item.propId);
    }, [onDelete]);

    return (
      <View>
        <Input
          onChangeText={_onChangeText}
          value={text}
          label={item.name}
          hint={`Nhập ${item.name.toLowerCase()}`}
          rightComponent={<DeleteButton onPress={_onDelete} />}
          widgetStyles={{container: l.alignCtr}}
        />
      </View>
    );
  },
);

export const PropertyInputs = React.memo(() => {
  const {setFieldValue, values} = useFormikContext<FormValues>();
  const [properties, setProperties] = useState<ProductPropertyType[]>(
    values.properties ?? [],
  );
  const cloneProperties = useRef<ProductPropertyType[]>([]);

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(
      ProductScreenID.SelectProps,
      {
        type: ProductPropType.Property,
      },
      (data: {result: ProductMetaType}) => {
        setTimeout(() => {
          if (data.result) {
            const isExist = !!properties.find(v => v.propId === data.result.id);
            if (isExist) {
              return;
            }
            const values = [
              ...properties,
              {
                name: data.result.name,
                propId: data.result.id,
                attribute: '',
              },
            ];
            cloneProperties.current = values;
            setProperties(values);
          }
        });
      },
    );
  }, [properties]);

  const onChangeText = (value: string, propId: number) => {
    const index = cloneProperties.current.findIndex(v => v.propId === propId);
    cloneProperties.current[index].attribute = value;
    setFieldValue('properties', cloneProperties.current);
  };

  const onDelete = useCallback(
    (propId: number) => {
      const data = properties.filter(v => v.propId !== propId);
      setProperties(data);
    },
    [properties],
  );

  const renderProperty = (item: ProductPropertyType, index: number) => {
    return (
      <PropertyInput
        key={index}
        onDelete={onDelete}
        onChangeText={onChangeText}
        item={item}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[l.flexRow, l.justifyBtw, l.alignCtr, l.mb20]}
        onPress={onAdd}>
        <Text style={t.h5LG}>Thêm thuộc tính</Text>
        <CircleTouchable bg={c.green800} size={25}>
          <PlusIcon size={16} color={c.white} />
        </CircleTouchable>
      </TouchableOpacity>
      <View>{properties.map(renderProperty)}</View>
    </View>
  );
});

export const AbubuWorldCategoriesInput = React.memo(() => {
  const dialog = useDialog();

  const onAdd = useCallback(() => {
    dialog.show({
      type: 'Info',
      message: 'Tính năng này sẽ được cập nhật sau',
    });
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={onAdd} activeOpacity={0.7} style={[l.mb20]}>
        <View style={[l.flexRow, l.justifyBtw, l.alignCtr]}>
          <Text style={t.h5LG}>Thêm ngành hàng</Text>
          <CircleTouchable bg={c.green800} size={25}>
            <PlusIcon size={16} color={c.white} />
          </CircleTouchable>
        </View>
        <Text style={t.pSM}>(Để hiện thị trên Abubu World)</Text>
      </TouchableOpacity>
    </View>
  );
});

export const InStockInput = React.memo(() => {
  const {
    setFieldValue,
    setFieldError,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext<FormValues>();

  const onChangeText = useCallback(
    (text: string) => {
      setFieldValue('quantity', text);
      if (!touched.quantity) {
        setFieldTouched('quantity', true);
      }
      if (values.avability) {
        setFieldError('quantity', '');
      } else {
        if (text) {
          setFieldError('quantity', '');
        } else {
          setFieldError('quantity', 'Vui lòng nhập số lượng tồn kho');
        }
      }
    },
    [values.avability],
  );

  useEffect(() => {
    if (values.avability) {
      setFieldError('quantity', '');
    } else {
      if (values.quantity) {
        setFieldError('quantity', '');
      } else {
        setFieldError('quantity', 'Vui lòng nhập số lượng tồn kho');
      }
    }
  }, [values.avability, values.quantity]);

  return (
    <Input
      touched={touched.quantity}
      error={errors.quantity}
      onChangeText={onChangeText}
      value={values.quantity}
      label={'Tồn kho'}
      hint="Nhập tồn kho"
      keyboardType="numeric"
    />
  );
});
