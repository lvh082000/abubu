import {ToggleSwitch} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import {OrderDetailsHeaderActions} from 'components/OrderDetailsHeaderActions';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';

const styles = StyleSheet.create({
  row: {
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.pb10,
    ...l.px20,
    ...l.pt20,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
  },
  text: {
    ...l.pl20,
    ...l.py5,
    borderBottomWidth: 0.5,
    borderColor: c.green800,
    backgroundColor: c.grey100,
    fontFamily: t.fontFamily.Winston.Light,
  },
});

const VoucherDetails = () => {
  const values = useRef({
    accounting: false,
  });

  const onCancel = useCallback(() => {}, []);

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
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="CTM000001"
        rightComponent={<OrderDetailsHeaderActions onCancel={onCancel} />}
      />

      <Text style={styles.text}>Thông tin</Text>

      <View style={[styles.row]}>
        <Text style={[t.bold, {color: c.black1000}]}>Người tạo</Text>
        <Text>Nguyễn Duy Toàn</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>Thời gian tạo</Text>
        <Text>01/09/2021{'   '} 14:28</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>Loại chi</Text>
        <Text>Làm biển quảng cáo</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>Giá trị</Text>
        <Text>{toStringPrice(1000000)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>Người nhận</Text>
        <Text>Nguyễn Văn Chiến</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>Ghi chú</Text>
        <Text>abc</Text>
      </View>
      <View style={styles.row}>
        <Text style={[t.bold, {color: c.black1000}]}>
          Hạch toán và kết quả HĐKD
        </Text>
        <ToggleSwitch
          handleOnPress={value => onValueChange('accounting', value)}
          value={values.current.accounting}
        />
      </View>
    </View>
  );
};

export default VoucherDetails;
