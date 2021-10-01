import {AvatarUploader} from 'components/CustomInputs';
import {Input, SharedValidationSchema} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {c, l} from 'styles/shared';
import {ProfileSettingFormValues as FormValues} from 'types/Properties';
import * as Yup from 'yup';
import styles from '../styles';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập tên của bạn'),
  phone: SharedValidationSchema.phoneNumber,
  email: SharedValidationSchema.email,
});

interface FormControlsProps {
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  initialImage?: string | undefined;
}

const ProfileSettingForm = React.memo(
  ({initialValues, initialImage, onSubmit}: FormControlsProps) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={styles.formContainer}>
              <AvatarUploader imageURI={initialImage} />
              <Input
                leftComponent={
                  <VectorIcon
                    color={c.green800}
                    type={IconType.material}
                    name="person"
                    size={20}
                  />
                }
                touched={touched.fullName}
                error={errors.fullName}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                hint={'Nhập tên của bạn'}
                autoCorrect={false}
                label={'Tên người dùng'}
                widgetStyles={{input: l.ml5}}
                hintTextColor={c.black400}
                focusedColor={c.grey1000}
                borderColor={c.green800}
              />

              <Input
                leftComponent={
                  <VectorIcon
                    color={c.green800}
                    type={IconType.materialCommunity}
                    name="phone"
                    size={18}
                  />
                }
                touched={touched.phone}
                error={errors.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
                hint={'Nhập số điện thoại'}
                autoCorrect={false}
                label={'Số điện thoại'}
                widgetStyles={{input: l.ml5}}
                hintTextColor={c.black400}
                focusedColor={c.grey1000}
                borderColor={c.green800}
                keyboardType="number-pad"
              />

              <Input
                leftComponent={
                  <VectorIcon
                    color={c.green800}
                    type={IconType.materialCommunity}
                    name="email"
                    size={18}
                  />
                }
                touched={touched.email}
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                hint={'Nhập email'}
                autoCorrect={false}
                label={'Email'}
                widgetStyles={{input: l.ml5}}
                hintTextColor={c.black400}
                focusedColor={c.grey1000}
                borderColor={c.green800}
                keyboardType="email-address"
              />

              <GradientButton
                widgetStyles={{container: [l.my20]}}
                variant="primary"
                title="LƯU"
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    );
  },
);

export default ProfileSettingForm;
