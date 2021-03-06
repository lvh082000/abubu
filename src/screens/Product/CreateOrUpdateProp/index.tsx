import {GradientHeader} from 'components/Header';
import React, {useCallback, useMemo} from 'react';
import {ScrollView} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import AddingItemForm from 'components/SharedForms/AddingItemForm';
import {useDialog} from 'components/Dialog';
import {useSpinner} from 'components/Spinner';
import NavigationService from 'services/NavigationService';
import {
  ProductScreenID,
  ProductStackParams,
} from 'navigation/ProductNavigation';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {
  CreateOrUpdateLocationPrefix,
  CreateOrUpdateBrandPrefix,
  CreateOrUpdateCategoryPrefix,
  CreateOrUpdatePropertyPrefix,
  fetchCreateOrUpdateBrand,
  fetchCreateOrUpdateCategory,
  fetchCreateOrUpdateLocation,
  fetchCreateOrUpdateProperty,
} from 'store/Product';
import {ProductPropType} from 'types/Properties';
import capitalize from 'lodash/capitalize';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.CreateOrUpdateProp>;
}

const CreateOrUpdateProp = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const thunkActionPrefix = useMemo(() => {
    switch (params.type) {
      case ProductPropType.Category:
        return CreateOrUpdateCategoryPrefix;
      case ProductPropType.Brand:
        return CreateOrUpdateBrandPrefix;
      case ProductPropType.Location:
        return CreateOrUpdateLocationPrefix;
      case ProductPropType.Property:
        return CreateOrUpdatePropertyPrefix;
    }
  }, []);

  const onSubmit = useCallback(
    values => {
      const body = {
        ...values,
        id: params.value?.id ?? 0,
      };
      switch (params.type) {
        case ProductPropType.Category:
          dispatch(fetchCreateOrUpdateCategory(body));
          break;
        case ProductPropType.Brand:
          dispatch(fetchCreateOrUpdateBrand(body));
          break;
        case ProductPropType.Location:
          dispatch(fetchCreateOrUpdateLocation(body));
          break;
        case ProductPropType.Property:
          dispatch(fetchCreateOrUpdateProperty(body));
          break;
      }
    },
    [params],
  );

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        title: 'Th??nh c??ng',
        message: `${capitalize(params.title)} ???? ???????c ${
          params.value ? 'c???p nh???t' : 't???o'
        } th??nh c??ng`,
        onModalConfirm: NavigationService.goBack,
      });
    }, 300);
  }, [params.value, params.title]);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(thunkActionPrefix, onSuccess, onError, onLoad);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      scrollEnabled={false}
      style={ContainerStyles}>
      <GradientHeader
        description="M?? t??? v??? m??n h??nh n??y"
        useBack
        title={`${params.value ? 'C???p nh???t' : 'Th??m'} ${params.title}`}
      />
      <AddingItemForm
        onSubmit={onSubmit}
        hint={`Nh???p t??n ${params.title}`}
        label={`T??n ${params.title}`}
        initialValues={{name: params.value?.name ?? ''}}
      />
    </ScrollView>
  );
};

export default CreateOrUpdateProp;
