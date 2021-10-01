import {GradientHeader} from 'components/Header';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {l, t, c} from 'styles/shared';
import {ToggleSwitch} from 'components/FormControls';
import {useRef} from 'react';

const styles = StyleSheet.create({
  item: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    borderBottomWidth: 1,
    ...l.px20,
    ...l.mb20,
    ...l.pb10,
    borderBottomColor: c.grey200,
  },
  title: {
    ...t.h5LG,
  },
});

const NotificationSetting = () => {
  const values = useRef({
    enablePayment: true,
    enableProduct: true,
    enableFundNumber: true,
    enableClient: true,
  });

  const onValueChange = (field: string, value: boolean) => {
    const data = {};
    //@ts-ignore
    data[field] = value;
    values.current = {
      ...values.current,
      ...data,
    };
  };

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thiết lập thông báo"
      />
      <View style={[l.mt20]}>
        <View style={styles.item}>
          <Text style={styles.title}>Hiển thị thông báo về giao dịch</Text>
          <ToggleSwitch
            handleOnPress={value => onValueChange('enablePayment', value)}
            value={values.current.enablePayment}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Hiển thị thông báo về hàng hóa</Text>
          <ToggleSwitch
            handleOnPress={value => onValueChange('enableProduct', value)}
            value={values.current.enableProduct}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Hiển thị thông báo về sổ quỹ</Text>
          <ToggleSwitch
            handleOnPress={value => onValueChange('enableFundNumber', value)}
            value={values.current.enableFundNumber}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Hiển thị thông báo về khách hàng</Text>
          <ToggleSwitch
            handleOnPress={value => onValueChange('enableClient', value)}
            value={values.current.enableClient}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationSetting;
