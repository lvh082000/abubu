import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import Text from 'components/Text';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {CreateOrUpdatePriceFormValues as FormValues} from 'types/Properties';
import * as Yup from 'yup';
import {Radio} from 'components/FormControls';
import {UOMInput} from 'components/CustomInputs';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên bảng giá'),
  value: Yup.string().required('Vui lòng nhập giá trị bảng giá'),
});

const PriceTypes = [
  {title: 'Tăng giá', value: 0},
  {title: 'Giảm giá', value: 1},
];

interface Props {
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  isUpdate: boolean;
}

const Form = ({onSubmit, initialValues, isUpdate}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => {
        return (
          <View style={[l.px20, l.mt30]}>
            <Input
              label="Tên bảng giá"
              value={values.name}
              hint="Nhập tên bảng giá"
              onChangeText={handleChange('name')}
              touched={touched.name}
              error={errors.name}
            />

            <Text style={[t.medium, l.mb10]}>Chọn loại bảng giá</Text>
            <Radio
              value={values.type}
              onChangeValue={value => setFieldValue('type', value)}
              widgetStyles={{
                container: [l.flexRow],
                option: [l.flex],
              }}
              type="square"
              options={PriceTypes}
            />

            <UOMInput />

            <View style={[l.mt5]}>
              <Text style={{color: c.grey1000}}>
                Điều chỉnh giảm giá, tăng giá so với giá bán chung (mặc định)
              </Text>
            </View>

            <GradientButton
              title={isUpdate ? 'CẬP NHẬP' : 'TẠO'}
              widgetStyles={{container: [l.mt30]}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default React.memo(Form);
