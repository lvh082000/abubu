import {Input, SharedValidationSchema} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import Text from 'components/Text';
import DeviceHelper from 'config/DeviceHelper';
import {Formik} from 'formik';
import React, {useState, useImperativeHandle, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {l, c, t} from 'styles/shared';
import * as Yup from 'yup';

export interface ShippingDeliveryCreateShipperModalRef {
  open: () => void;
  close: () => void;
}

interface FormValues {
  name: string;
  phone: string;
}

interface ShippingDeliveryCreateShipperModalProps {
  onDone: (values: FormValues) => void;
}

const initialValues: FormValues = {
  name: '',
  phone: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên người giao hàng'),
  phone: SharedValidationSchema.phoneNumber,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: c.white,
    borderRadius: 5,
    flexGrow: 0,
    flexShrink: 0,
  },
});

const ShippingDeliveryCreateShipperModalComponent = React.forwardRef<
  ShippingDeliveryCreateShipperModalRef,
  ShippingDeliveryCreateShipperModalProps
>(({onDone}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const formValues = useRef<FormValues | null>(null);

  let _handleReset: Function;

  const onModalHide = () => {
    setTimeout(() => {
      if (!!_handleReset) {
        _handleReset();
      }
      if (!!formValues.current) {
        onDone(formValues.current);
      }
      formValues.current = null;
    }, 100);
  };

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      Keyboard.dismiss();
    });
  };

  const open = () => {
    setVisible(true);
  };

  const onSubmit = (values: FormValues) => {
    formValues.current = values;
    close();
  };

  useImperativeHandle(ref, () => ({
    close,
    open,
  }));

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  return (
    <Modal
      style={[l.flex, l.justifyStrt, {marginTop: 150}]}
      onModalHide={onModalHide}
      onBackdropPress={close}
      onBackButtonPress={close}
      deviceHeight={DeviceHelper.height}
      statusBarTranslucent={true}
      isVisible={visible}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleReset,
        }) => {
          _handleReset = handleReset;
          return (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              scrollEnabled={false}
              style={styles.container}>
              <View style={[l.p20, l.pt30]}>
                <Input
                  ref={inputRef}
                  hint="Nhập tên người vận chuyển"
                  label="Tên người vận chuyển"
                  value={values.name}
                  touched={touched.name}
                  error={errors.name}
                  onChangeText={handleChange('name')}
                />
                <Input
                  hint="Nhập số điện thoai"
                  label="Số điện thoại"
                  keyboardType="phone-pad"
                  maskType="phone"
                  value={values.phone}
                  touched={touched.phone}
                  error={errors.phone}
                  onChangeText={handleChange('phone')}
                />
              </View>
              <GradientButton
                onPress={handleSubmit}
                widgetStyles={{container: l.mx20}}
                title="Xong"
              />
              <TouchableOpacity
                onPress={close}
                activeOpacity={0.7}
                style={[l.px20, l.py20]}>
                <Text style={[t.textCtr, t.h5, {color: c.red800}, t.bold]}>
                  Đóng
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      </Formik>
    </Modal>
  );
});

export const ShippingDeliveryCreateShipperModal = React.memo(
  ShippingDeliveryCreateShipperModalComponent,
);
