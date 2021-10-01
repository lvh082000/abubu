import {GradientHeader} from 'components/Header';
import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {l} from 'styles/shared';
import DebtSettingForm from './components/Form';

const DebtSetting = () => {
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Cài đặt công nợ"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <DebtSettingForm />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DebtSetting;
