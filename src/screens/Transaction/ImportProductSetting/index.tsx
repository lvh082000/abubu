import {RouteProp} from '@react-navigation/native';
import {UOMInput} from 'components/CustomInputs';
import {useDialog} from 'components/Dialog';
import {CurrencyInput, Input, YupExtended} from 'components/FormControls';
import {FormikValuesChange} from 'components/FormControls/FormikValuesChange';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useSpinner} from 'components/Spinner';
import Text from 'components/Text';
import {Formik} from 'formik';
import {useFetch} from 'hooks/useFetch';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {ProductService} from 'services/ProductService';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';
import {
  ImportedProductType,
  ImportProductSettingFormValues as FormValues,
  ImportStatusType,
} from 'types/Properties';
import {ProductDetailsType} from 'types/Responses/FetchReadProductResponse';
import {QuantityInput} from './components/InputControls';
import ProductItem from './components/ProductItem';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ImportProductSetting
  >;
}

type TotalData = {
  totalAmount: number;
};

const validationSchema = YupExtended.object().shape({
  unitPrice: YupExtended.string().required('Vui lòng nhập đơn giá').currency(),
});

const TrackingFields = ['quantity', 'uom', 'value', 'unitPrice'];

const ImportProductSetting = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const {data, isLoading} = useFetch<ProductDetailsType>(
    ProductService.fetchGetProduct,
    {
      params: params.productId,
    },
  );
  const [total, setTotal] = useState<TotalData>({
    totalAmount: 0,
  });

  const initialValues: FormValues = useMemo(() => {
    let price = data?.costPrice as number;
    if (params.productPrice) {
      price = params.productPrice as number;
    }
    return {
      quantity: 1,
      description: '',
      unitPrice: toStringPrice(price),
      uom: 'cash',
      value: '',
    };
  }, [data]);

  useEffect(() => {
    if (initialValues.unitPrice !== '0') {
      fetchCalculateTotalPrice(initialValues);
    }
  }, [initialValues]);

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      spinner.show();
      const product = getCurrentProduct(values);
      const otherProducts = params.otherProducts.map(v => {
        return {
          id: v.id,
          discount: 0,
          discountType: 'cash',
          price: v.price,
          description: '',
          quantity: v.quantity,
        };
      });
      if (params.isImportProduct) {
        const {data} = await OrderService.fetchCreateOrUpdateImportProduct({
          provider: params.providerId,
          products: [...otherProducts, product] as ImportedProductType[],
          id: params.importProductId,
          newStatus: ImportStatusType.Processing,
          payments: [],
        });
        dialog.show({
          type: 'Success',
          message: 'Cập nhật thành công',
          onModalConfirm: () => {
            NavigationService.goBack(1, {
              result: {
                id: data.id,
                products: data.products,
              },
            });
          },
        });
      } else {
        const {data} =
          await OrderService.fetchCreateOrUpdateReturnOfImportedGood({
            provider: params.providerId,
            products: [...otherProducts, product] as ImportedProductType[],
            id: params.importProductId,
            newStatus: ImportStatusType.Processing,
            payments: [],
          });
        dialog.show({
          type: 'Success',
          message: 'Cập nhật thành công',
          onModalConfirm: () => {
            NavigationService.goBack(1, {
              result: {
                id: data.id,
                products: data.products,
              },
            });
          },
        });
      }
    } catch (error) {
      console.log('[ERROR] fetchCreateOrUpdateImportProduct', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  const getCurrentProduct = (values: FormValues) => {
    const {uom, value, unitPrice, quantity, description} = values;
    const discount = OrderService.getDiscountData({
      uom,
      value,
    });
    return {
      id: params.productId,
      discount: discount.value,
      discountType: discount.type,
      price: !!unitPrice ? toNumberPrice(unitPrice) : 0,
      description,
      quantity,
    };
  };

  const fetchCalculateTotalPrice = async (
    values: FormValues,
    isShowLoading?: boolean,
  ) => {
    try {
      const product = getCurrentProduct(values);
      if (product.price <= 0) {
        return;
      }
      if (isShowLoading) {
        spinner.show();
      }

      const {data} = await OrderService.fetchCalculateImportProductTotalPrice([
        product,
      ]);

      const value = data.products.find(v => v.id === product.id);

      setTotal({
        totalAmount: value?.totalPrice as number,
      });
    } catch (error) {
      console.log('[ERROR] fetchCalculateImportProductTotalPrice', error);
    } finally {
      if (isShowLoading) {
        spinner.dismiss();
      }
    }
  };

  const onValuesChange = useCallback(
    async (values: FormValues) => {
      await fetchCalculateTotalPrice(values, true);
    },
    [data],
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return null;
    }
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ProductItem product={data} />
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({values, errors, touched, handleSubmit, handleChange}) => {
            return (
              <>
                <FormikValuesChange<FormValues>
                  fields={TrackingFields}
                  onValuesChange={onValuesChange}
                />
                <View style={[l.px20, {backgroundColor: c.white}, l.flex]}>
                  <QuantityInput />

                  <CurrencyInput
                    touched={touched.unitPrice}
                    error={errors.unitPrice}
                    onChangeText={handleChange('unitPrice')}
                    value={values.unitPrice}
                    hint={'Nhập đơn giá'}
                    label={'Đơn giá'}
                  />

                  <UOMInput />

                  <Input
                    onChangeText={handleChange('description')}
                    value={values.description}
                    hint={'Nhập ghi chú'}
                    label={'Ghi chú'}
                  />

                  <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
                    <Text style={[t.bold, t.h5LG]}>Tổng tiền:</Text>
                    <Text style={[t.bold, t.h5LG, {color: c.red800}]}>
                      {toStringPrice(total.totalAmount)}
                    </Text>
                  </View>

                  <GradientButton
                    title="LƯU"
                    widgetStyles={{container: [l.mt30, l.mb20]}}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title={params.productName}
        useBack
      />
      {renderContent()}
    </View>
  );
};

export default ImportProductSetting;
