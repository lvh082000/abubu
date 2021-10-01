import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {useAppDispatch, useThunkStatusAction} from 'hooks/useRedux';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import CreateOrUpdateProductForm from './components/Form';
import {CreateOrUpdateProductFormValues as FormValues} from 'types/Properties';
import {RouteProp} from '@react-navigation/native';
import {
  ProductScreenID,
  ProductStackParams,
  ProductTabScreenID,
} from 'navigation/ProductNavigation';
import {ProductService} from 'services/ProductService';
import {useFetch} from 'hooks/useFetch';
import {ProductDetailsType} from 'types/Responses/FetchReadProductResponse';
import {
  fetchGetProductMetaData,
  GetIsMetaDataLoaded,
  GetProductMetaDataPrefix,
} from 'store/Product';
import LoadingView from 'components/LoadingView';
import {DrawerScreenID, RootScreenID} from 'navigation/types';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.CreateOrUpdateProduct>;
}

const CreateOrUpdateProduct = ({route: {params}}: Props) => {
  const isMetaDataLoaded = GetIsMetaDataLoaded();
  const dialog = useDialog();
  const spinner = useSpinner();
  const dispatch = useAppDispatch();
  const productMetaDataStatus = useThunkStatusAction(GetProductMetaDataPrefix);
  // add loading state in here to
  // 1. The data won't be parsed to the form in the first render
  // 2. Reduce lag in the first render
  const useFetchParams = useMemo(() => {
    return params ? params.id : false;
  }, []);
  const [loading, setLoading] = useState(true);
  const {data} = useFetch<ProductDetailsType>(ProductService.fetchGetProduct, {
    params: useFetchParams,
  });
  const isLoading = params ? false : productMetaDataStatus.isLoading;

  const initialValues = useMemo(() => {
    return ProductService.mapDataToProductForm(data);
  }, [data]);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Product,
      params: {
        screen: ProductTabScreenID.Products,
      },
    });
  };

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        Keyboard.dismiss();
        spinner.show();
        await ProductService.fetchCreateOrUpdateProduct({
          ...values,
          id: params?.id ?? undefined,
        });
        setTimeout(() => {
          dialog.show({
            type: 'Success',
            message: `Sản phẩm đã được ${
              params ? 'cập nhật' : 'tạo'
            } thành công`,
            canCloseByBackdrop: false,
            onModalConfirm: handleBack,
          });
        }, 300);
      } catch (error) {
        console.log('[ERROR] fetchCreateOrUpdateProduct', error);
      } finally {
        spinner.dismiss();
      }
    },
    [params],
  );

  const onDelete = useCallback(async () => {
    try {
      Keyboard.dismiss();
      spinner.show();
      await ProductService.fetchDeleteProduct(
        params?.id as number,
        data?.images,
      );
      spinner.dismiss();
      handleBack();
    } catch (error) {
      spinner.dismiss();
      console.log('[ERROR] fetchDeleteProduct', error);
    }
  }, [data?.images]);

  useEffect(() => {
    if (!isMetaDataLoaded) {
      dispatch(fetchGetProductMetaData());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const renderContent = () => {
    if (isLoading || loading) {
      return <LoadingView />;
    }
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={[l.flex]}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <CreateOrUpdateProductForm
          initialValues={initialValues}
          isUpdate={!!params?.id}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={!params ? 'Thêm sản phảm' : 'Cập nhật sản phẩm'}
      />
      {renderContent()}
    </View>
  );
};

export default CreateOrUpdateProduct;
