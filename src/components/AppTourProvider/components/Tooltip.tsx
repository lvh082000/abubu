import {TooltipProps} from 'rn-tourguide';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import VectorIcon, {IconType} from 'components/VectorIcon';
import DeviceHelper from 'config/DeviceHelper';
import DotPagination from 'components/DotPagination';
import Button from 'components/Button';
import Constants from 'config/Constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: c.white,
    ...l.p20,
    borderRadius: 10,
    width: DeviceHelper.width - 40,
    borderWidth: 1,
    borderColor: c.black1000,
  },
  message: {
    ...l.ml10,
    ...t.h5,
    ...l.mr20,
  },
  title: {
    fontFamily: t.fontFamily.Winston.Bold,
    ...l.mt10,
    ...l.mb10,
  },
  handle: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.mt20,
  },
  buttonText: {
    color: c.green800,
    fontFamily: t.fontFamily.Winston.Bold,
    ...t.h5,
  },
});

export const Tooltip = ({
  handleNext,
  handleStop,
  currentStep,
}: TooltipProps) => {
  const index = currentStep.order - 1;
  if (index === Constants.AppTours.length - 1) {
    return (
      <View style={[styles.container, l.mb20, l.flexCenter]}>
        <VectorIcon
          color={c.green200}
          size={50}
          type={IconType.custom}
          name={'clapping'}
        />
        <Text style={styles.title}>ĐÃ HOÀN TẤT</Text>
        <View style={[l.flexCenter, {position: 'relative'}]}>
          <Text style={styles.message}>
            {Constants.AppTours[7]}
            <VectorIcon
              color={c.green200}
              size={25}
              type={IconType.fontAwesome}
              name={'question-circle'}
            />
          </Text>
        </View>
        <Button
          size="sm"
          onPress={handleStop}
          variant="primary"
          title="Đã hiểu"
          widgetStyles={{container: [l.fullWidth, l.mt20]}}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={l.flexRow}>
        <VectorIcon
          color={c.green200}
          size={25}
          type={IconType.fontAwesome}
          name={'question-circle'}
        />
        <Text style={[styles.message, {height: 80}]}>{currentStep.text}</Text>
      </View>
      <View style={styles.handle}>
        <View style={{width: 30}} />
        <DotPagination
          color={c.green200}
          activeIndex={index}
          length={Constants.AppTours.length - 1}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={handleNext}>
          <Text style={styles.buttonText}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
