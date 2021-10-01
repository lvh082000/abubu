import React from 'react';
import {TouchableOpacity} from 'react-native';
import GradientButton from 'components/GradientButton';
import {l, t, c} from 'styles/shared';
import FooterButtonContainer from 'components/FooterButtonContainer';
import Text from 'components/Text';

const DebitGroupButtons = React.memo(() => {
  return (
    <FooterButtonContainer style={l.flexCol}>
      <GradientButton
        title="THANH TOÁN"
        onPress={() => {}}
        widgetStyles={{container: [l.mx20, l.fullWidth]}}
      />

      <TouchableOpacity activeOpacity={0.7} style={[l.mx20, l.mt20]}>
        <Text style={[t.bold, {color: c.green800}, t.h5]}>ĐIỀU CHỈNH</Text>
      </TouchableOpacity>
    </FooterButtonContainer>
  );
});
export default DebitGroupButtons;
