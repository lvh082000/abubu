import {useDialog} from 'components/Dialog';
import {CurrencyInput, Input, YupExtended} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import Text from 'components/Text';
import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {CreateOrUpdateProductFormValues as FormValues} from 'types/Properties';
import {
  AbubuWorldCategoriesInput,
  CodeInput,
  InStockInput,
  PropertyInputs,
  SelectBrand,
  SelectCategory,
  SelectLocation,
  ToggleInput,
} from './InputControls';
import {ProductImagesUploader} from './ProductImagesUploader';

const validationSchema = YupExtended.object().shape({
  name: YupExtended.string().required('Vui lòng nhập tên sản phẩm'),
  sellPrice: YupExtended.string().required('Vui lòng nhập giá bán').currency(),
  costPrice: YupExtended.string().required('Vui lòng nhập giá vốn').currency(),
  quantity: YupExtended.string()
    .required('Vui lòng nhập số lượng tồn kho')
    .integer(),
});

interface FormControlsProps {
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  isUpdate: boolean;
  onDelete?: () => void;
}

const CreateOrUpdateProductForm = React.memo(
  ({onSubmit, onDelete, initialValues, isUpdate}: FormControlsProps) => {
    const dialog = useDialog();

    const _onDelete = useCallback(() => {
      dialog.show({
        type: 'Confirmation',
        message: 'Bạn có muốn xóa sản phẩm này?',
        onModalConfirm: onDelete,
      });
    }, [onDelete]);

    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={l.mx20}>
              <ProductImagesUploader images={values.images} />
              <View style={[l.flex, l.mt30]}>
                <CodeInput />

                <Input
                  touched={touched.name}
                  error={errors.name}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  label={'Tên hàng'}
                  hint="Nhập tên sản phẩm"
                />

                <SelectCategory />

                <SelectBrand />

                <CurrencyInput
                  touched={touched.sellPrice}
                  error={errors.sellPrice}
                  onChangeText={handleChange('sellPrice')}
                  value={values.sellPrice}
                  label={'Giá bán'}
                  hint="Nhập giá bán"
                />

                <CurrencyInput
                  touched={touched.costPrice}
                  error={errors.costPrice}
                  onChangeText={handleChange('costPrice')}
                  value={values.costPrice}
                  label={'Giá vốn'}
                  hint="Nhập giá vốn"
                />

                <InStockInput />

                <ToggleInput
                  field="avability"
                  title="Cho phép bán khi tồn kho bằng 0"
                  description="Áp dụng với hàng hóa là dịch vụ, ăn uống..."
                />

                <Input
                  onChangeText={handleChange('weight')}
                  value={values.weight}
                  label={'Trọng lượng - Gram'}
                  hint="Nhập trọng lượng (Gram)"
                  keyboardType="numeric"
                />

                <SelectLocation />

                <Input
                  onChangeText={handleChange('description')}
                  label={'Mô tả'}
                  hint="Nhập mô tả"
                  multiline={true}
                  maxLength={100}
                />

                <PropertyInputs />

                <Text style={[t.h4SM, l.mb10, {color: c.green800}]}>
                  Cấu hình trên thế giới Abubu (Đang hoàn thiện)
                </Text>

                <AbubuWorldCategoriesInput />

                <ToggleInput
                  field="showOnWeb"
                  title="Hiện trên web"
                  isDisabled={true}
                />

                <ToggleInput
                  field="goodSale"
                  title="Là sản phẩm bán chạy"
                  isDisabled={true}
                />

                <ToggleInput
                  field="isNew"
                  title="Là sản phẩm mới"
                  isDisabled={true}
                />

                <ToggleInput
                  field="promotion"
                  title="Khuyễn mãi"
                  isDisabled={true}
                />

                <CurrencyInput
                  onChangeText={handleChange('abubuPrice')}
                  value={values.abubuPrice}
                  label={'Giá trên Abubu World'}
                  hint="Nhập giá trên Abubu World"
                />

                <GradientButton
                  variant="primary"
                  title="LƯU"
                  onPress={handleSubmit}
                  widgetStyles={{
                    container: [isUpdate ? l.mb10 : l.mb30, l.mt10],
                  }}
                />

                {isUpdate && (
                  <GradientButton
                    variant="danger"
                    title="XÓA"
                    onPress={_onDelete}
                    widgetStyles={{container: [l.mb30, l.mt10]}}
                  />
                )}
              </View>
            </View>
          );
        }}
      </Formik>
    );
  },
);

export default CreateOrUpdateProductForm;
