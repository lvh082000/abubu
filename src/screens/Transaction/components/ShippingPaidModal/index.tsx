import {CurrencyInput} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import Text from 'components/Text';
import DeviceHelper from 'config/DeviceHelper';
import React, {useState, useImperativeHandle, useRef, useEffect} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {toNumberPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';

export interface ShippingPaidModalRef {
  open: () => void;
  close: () => void;
}

interface ShippingPaidModalProps {
  onDone: (value: number) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: c.white,
    borderRadius: 5,
    flexGrow: 0,
    flexShrink: 0,
  },
});

const ShippingPaidModalComponent = React.forwardRef<
  ShippingPaidModalRef,
  ShippingPaidModalProps
>(({onDone}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const onModalHide = () => {
    const _value = value ? toNumberPrice(value) : 0;
    setTimeout(() => {
      if (_value > 0) {
        onDone(_value);
        setValue('');
      }
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
      onModalHide={onModalHide}
      deviceHeight={DeviceHelper.height}
      statusBarTranslucent={true}
      isVisible={visible}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        style={styles.container}>
        <View style={[l.p20, l.pt30]}>
          <CurrencyInput
            ref={inputRef}
            hint="Nhập số tiền khách đã thanh toán"
            label="Số tiền"
            value={value}
            onChangeText={value => setValue(value)}
          />
        </View>
        <GradientButton
          onPress={close}
          widgetStyles={{container: l.mx20}}
          title="Xong"
        />
        <TouchableOpacity
          onPress={close}
          activeOpacity={0.7}
          style={[l.px20, l.py20]}>
          <Text style={[t.textCtr, t.h5, {color: c.red800}, t.bold]}>Đóng</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
});

export const ShippingPaidModal = React.memo(ShippingPaidModalComponent);
