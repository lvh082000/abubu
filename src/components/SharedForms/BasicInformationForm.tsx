import {
  AvatarUploader,
  SelectDistrict,
  SelectProvince,
} from 'components/CustomInputs';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import * as Yup from 'yup';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {BasicInformationFormValues as FormValues} from 'types/Properties';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập họ tên'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại'),
});

interface BasicInformationFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

const BasicInformationForm = ({
  initialValues,
  onSubmit,
}: BasicInformationFormProps) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <View style={[l.flex, l.mx20]}>
            <AvatarUploader imageURI={initialValues?.avatar} />
            <Input
              onChangeText={handleChange('name')}
              value={values?.name}
              hint={'Nhập tên'}
              label={'Tên'}
              touched={touched.name}
              error={errors.name}
            />

            <Input
              onChangeText={handleChange('phone')}
              value={values?.phone}
              hint={'Nhập số điện thoại'}
              label={'Số điện thoại'}
              touched={touched.phone}
              error={errors.phone}
              keyboardType="phone-pad"
            />

            <SelectProvince<FormValues> />

            <SelectDistrict<FormValues> />

            <Input
              onChangeText={handleChange('address')}
              value={values?.address}
              hint={'Nhập địa chỉ'}
              label={'Địa chỉ'}
              touched={touched.address}
              error={errors.address}
            />

            <Input
              onChangeText={handleChange('email')}
              value={values?.email}
              hint={'Nhập email'}
              label={'Email'}
              touched={touched.email}
              error={errors.email}
            />

            <Input
              onChangeText={handleChange('taxCode')}
              value={values?.taxCode}
              hint={'Nhập mã số thuế'}
              label={'Mã số thuế'}
              touched={touched.taxCode}
              error={errors.taxCode}
            />

            <Input
              onChangeText={handleChange('facebook')}
              value={values?.facebook}
              hint={'Nhập Facebook'}
              label={'Facebook'}
              touched={touched.facebook}
              error={errors.facebook}
            />

            <Input
              onChangeText={handleChange('description')}
              value={values?.description}
              hint={'Nhập ghi chú'}
              label={'Ghi chú'}
              touched={touched.description}
              error={errors.description}
            />

            <GradientButton
              widgetStyles={{container: [l.mb30, l.mt20]}}
              onPress={handleSubmit}
              title="LƯU"
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default BasicInformationForm;
