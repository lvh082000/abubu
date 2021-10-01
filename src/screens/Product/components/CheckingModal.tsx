import {CounterInput} from 'components/FormControls';
import Text from 'components/Text';
import DeviceHelper from 'config/DeviceHelper';
import React, {
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {l, c, t} from 'styles/shared';
import {ProductIntentoryItem} from 'types/Properties';

export interface CheckingModalRef {
  open: (product: ProductIntentoryItem) => void;
  close: () => void;
}

interface CheckingModalProps {
  onResult: (data: {id: number; value: number}) => void;
}

const Header = React.memo(({product}: {product: ProductIntentoryItem}) => {
  return (
    <View style={[l.py15, {backgroundColor: c.green800}]}>
      <Text style={[{color: c.white}, t.textCtr, t.bold]}>
        {product.name} - {product.barcode}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: c.white,
    borderRadius: 5,
    overflow: 'hidden',
  },
  formContainer: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.mt20,
    ...l.pt20,
    borderTopColor: c.green800,
    borderTopWidth: 1,
  },
  viewButton: {
    ...l.flexRow,
    ...l.justifyCtr,
    ...l.my10,
  },
  button: {
    ...l.mx10,
    ...l.py10,
    ...l.alignCtr,
    borderRadius: 5,
    width: 100,
  },
});

const CheckingModal = React.forwardRef<CheckingModalRef, CheckingModalProps>(
  ({onResult}, ref) => {
    const [value, setValue] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductIntentoryItem | undefined>(
      undefined,
    );
    const counterRef = useRef<TextInput>(null);
    const result = useRef<number>(0);

    const close = () => {
      setVisible(false);
      setTimeout(() => {
        Keyboard.dismiss();
      });
    };

    const open = (product: ProductIntentoryItem) => {
      setProduct(product);
      setVisible(true);
      setValue(0);
      result.current = 0;
    };

    const onReplace = useCallback(() => {
      close();
      result.current -= value;
    }, [value]);

    const onAdd = useCallback(() => {
      close();
      result.current += value;
    }, [product, value]);

    const onValueChange = useCallback(value => {
      setValue(value);
    }, []);

    const onModalHide = useCallback(() => {
      onResult({
        id: product?.id as number,
        value: result.current,
      });
    }, [onResult, product]);

    useImperativeHandle(ref, () => ({
      close,
      open,
    }));

    useEffect(() => {
      if (visible) {
        setTimeout(() => {
          counterRef.current?.focus();
        }, 100);
      }
    }, [visible]);

    const renderContent = () => {
      if (!product) {
        return <View />;
      }
      return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={25}
          behavior={'position'}
          enabled>
          <View style={styles.container}>
            <Header product={product} />
            <View style={l.p20}>
              <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
                <View>
                  <Text style={[t.h5, t.bold]}>Tồn kho</Text>
                  <Text style={[t.h5, t.textCtr, l.mt5]}>
                    {product.quantity}
                  </Text>
                </View>
                <View>
                  <Text style={[t.h5, t.bold]}>Đã kiểm</Text>
                  <Text style={[t.h5, t.textCtr, l.mt5]}>{product.actual}</Text>
                </View>
                <View>
                  <Text style={[t.h5, t.bold]}>Chênh lệch</Text>
                  <Text style={[t.h5, t.textCtr, l.mt5]}>
                    {product.actual - product.quantity}
                  </Text>
                </View>
              </View>
              <View style={styles.formContainer}>
                <Text style={t.h5}>Số lượng</Text>
                <CounterInput
                  ref={counterRef}
                  widgetStyles={{input: {width: 80}}}
                  value={value}
                  maxLength={8}
                  onValueChange={onValueChange}
                />
              </View>
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, {backgroundColor: c.green200}]}
                onPress={onAdd}>
                <Text style={{color: c.white}}>Cộng thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, {backgroundColor: c.blue600}]}
                onPress={onReplace}>
                <Text style={{color: c.white}}>Ghi đè</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    };

    return (
      <Modal
        onModalHide={onModalHide}
        onBackdropPress={close}
        onBackButtonPress={close}
        deviceHeight={DeviceHelper.height}
        statusBarTranslucent={true}
        isVisible={visible}>
        {renderContent()}
      </Modal>
    );
  },
);

export default React.memo(CheckingModal);
