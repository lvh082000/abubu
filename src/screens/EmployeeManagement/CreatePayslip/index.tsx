import {NonAvatar} from 'components/Avatar';
import CircleTouchable from 'components/CircleTouchable';
import {CounterInput} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import {OrderDetailsHeaderActions} from 'components/OrderDetailsHeaderActions';
import OrderedNavigationButton from 'components/OrderedNavigationButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';
import Form from './components/Form';

const options = [
  {
    id: 1,
    title: 'Lương cứng',
  },
  {
    id: 2,
    title: 'Lương kinh doanh',
  },
  {
    id: 3,
    title: 'Phụ cấp ăn trưa',
  },
  {
    id: 4,
    title: 'Phụ cấp ăn ca',
  },
  {
    id: 5,
    title: 'Đã tạm ứng',
  },
];

const styles = StyleSheet.create({
  container: {
    ...l.flex,
    backgroundColor: c.grey1000,
  },
  itemContainer: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.mt10,
    ...l.px20,
    ...l.pb10,
    borderBottomWidth: 1,
    borderBottomColor: c.grey100,
  },
});

const Options = React.memo(() => {
  return (
    <>
      {options.map(option => (
        <View key={option.id} style={styles.itemContainer}>
          <Text>{option.title}</Text>
          <CounterInput step={10000} value={500000} />
        </View>
      ))}
    </>
  );
});

const CreatePayslip = () => {
  const onCancel = useCallback(() => {}, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Tạo phiếu lương tháng"
        rightComponent={<OrderDetailsHeaderActions onCancel={onCancel} />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={l.flex}>
        <View style={[{backgroundColor: c.grey100}]}>
          <View style={[{backgroundColor: c.white}, l.mb30, l.pb20]}>
            <OrderedNavigationButton
              placeholder="Chọn nhân viên"
              value="Nhân viên"
              icon={
                <VectorIcon
                  color={c.brown400}
                  size={20}
                  name="person"
                  type={IconType.material}
                />
              }
            />
            <View style={[l.flexRow, l.flexCenter, l.mt20]}>
              <NonAvatar name="H" type="circle" size={60} />
              <View style={[l.ml10]}>
                <Text style={[t.bold]}>Nguyễn Văn A</Text>
                <Text style={[t.bold]}>NV00001</Text>
                <Text style={[t.medium]}>0123456789</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[{backgroundColor: c.grey100}]}>
          <View style={[{backgroundColor: c.white}, l.mb30, l.pb20]}>
            <Options />

            <View
              style={[
                styles.itemContainer,
                l.justifyStrt,
                l.mt20,
                l.pb0,
                {borderBottomWidth: 0},
              ]}>
              <CircleTouchable bg={c.green800} size={40}>
                <VectorIcon
                  type={IconType.fontAwesome}
                  name="plus"
                  size={22}
                  color={c.white}
                />
              </CircleTouchable>

              <Text style={[t.bold, t.h5, {color: c.green800}, l.pl10]}>
                Thêm thuộc tính
              </Text>
            </View>
          </View>
        </View>

        <Form onSubmit={() => {}} />
      </ScrollView>
    </View>
  );
};

export default CreatePayslip;
