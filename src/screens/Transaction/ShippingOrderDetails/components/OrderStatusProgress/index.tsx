import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import DeviceHelper from 'config/DeviceHelper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {l, c, t} from 'styles/shared';
import {ShippingOrderInfoType} from 'types/Responses/FetchGetOrderDetailsResponse';
import Dayjs from 'dayjs';

interface ItemProps {
  label: string;
  index: number;
  time: number | null;
}

interface Props {
  shipInfo: ShippingOrderInfoType;
}

const CheckboxSize = 30;

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    backgroundColor: c.grey100,
    ...l.pt10,
    ...l.justifyBtw,
    ...l.pr20,
    ...l.pl10,
    ...l.pb15,
  },
  checkBox: {
    width: CheckboxSize,
    height: CheckboxSize,
    backgroundColor: c.green400,
    borderWidth: 2,
    borderColor: c.green400,
    ...l.flexCenter,
    borderRadius: CheckboxSize / 2,
  },
  itemContainer: {
    ...l.flexCenter,
    width: 90,
  },
  progressBarStyle: {
    backgroundColor: c.brown100,
    height: 3,
    ...l.flexCenter,
    marginTop: 45,
    marginLeft: -22,
  },
});

const Item = React.memo(({label, time}: ItemProps) => {
  return (
    <View style={[styles.itemContainer]}>
      <Text style={[t.medium, t.h5, l.mb10]}>{label}</Text>
      {!!time && (
        <View style={styles.checkBox}>
          <VectorIcon
            type={IconType.fontAwesome}
            name="check"
            size={16}
            color={c.white}
          />
        </View>
      )}
      {!time && (
        <View style={[styles.checkBox, {backgroundColor: c.grey100}]} />
      )}
      {time && (
        <>
          <Text style={[l.mt5]}>{Dayjs(time * 1000).format('HH:mm')}</Text>
          <Text style={[t.pSM]}>{Dayjs(time * 1000).format('DD/MM/YYYY')}</Text>
        </>
      )}
      {!time && (
        <>
          <Text style={[l.mt5, {color: c.grey100}]}>1</Text>
          <Text style={[t.pSM, {color: c.grey100}]}>2</Text>
        </>
      )}
    </View>
  );
});

const ProgressBar = React.memo(() => {
  const width = (DeviceHelper.width - CheckboxSize * 4 - 80 - 60) / 3;

  return (
    <View style={[l.flex]}>
      <View style={[styles.progressBarStyle, {width}]} />
    </View>
  );
});

const OrderStatusProgress = ({shipInfo}: Props) => {
  return (
    <View style={styles.container}>
      <Item time={shipInfo.createdAt} index={0} label="Tạo đơn" />

      <ProgressBar />

      <Item time={shipInfo.packedAt} index={1} label="Đóng gói" />

      <ProgressBar />

      <Item time={shipInfo.exportAt} index={2} label="Xuất kho" />

      <ProgressBar />

      <Item time={shipInfo.doneAt} index={3} label="Hoàn thành" />
    </View>
  );
};

export default React.memo(OrderStatusProgress);
