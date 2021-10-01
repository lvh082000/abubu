import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {l} from 'styles/shared';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const KeyboardScrollView: FC<Props> = ({children, style}) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={[l.flex, style]}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardScrollView;
