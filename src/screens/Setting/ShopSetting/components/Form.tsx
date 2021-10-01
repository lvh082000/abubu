import {AvatarUploader} from 'components/CustomInputs';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {c, l} from 'styles/shared';
import {ShopSettingFormValues as FormValues} from 'types/Properties';
import * as Yup from 'yup';
import styles from '../styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên cửa hàng'),
  address: Yup.string().required('Vui lòng nhập địa chỉ'),
});

interface FormControlsProps {
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  initialImage?: string | undefined;
}

const ShopSettingForm = React.memo(
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
                    name="store"
                    size={20}
                  />
                }
                touched={touched.name}
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
                hint={'Nhập tên cửa hàng'}
                autoCorrect={false}
                label={'Tên cửa hàng'}
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
                    name="map-marker"
                    size={18}
                  />
                }
                touched={touched.address}
                error={errors.address}
                onChangeText={handleChange('address')}
                value={values.address}
                hint={'Nhập địa chỉ'}
                autoCorrect={false}
                label={'Địa chỉ'}
                widgetStyles={{input: l.ml5}}
                hintTextColor={c.black400}
                focusedColor={c.grey1000}
                borderColor={c.green800}
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

export default ShopSettingForm;
