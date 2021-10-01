import Text from 'components/Text';
import Constants from 'config/Constants';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TourGuideZone} from 'rn-tourguide';
import {c, l, t} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    ...l.mx20,
    ...l.mt20,
  },
  wrapper: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.px20,
    borderWidth: 2,
    borderColor: c.green800,
    borderRadius: 34,
    ...l.py10,
  },
});

const AbubuWorld = () => {
  return (
    <View style={styles.container}>
      <TourGuideZone
        style={styles.wrapper}
        borderRadius={5}
        keepTooltipPosition={true}
        zone={1}
        shape="rectangle"
        text={Constants.AppTours[0]}>
        <Image
          resizeMode={'contain'}
          style={{height: 50, width: 70}}
          source={require('../../../assets/images/abubu_world.png')}
        />
        <View>
          <Text style={[t.textCtr, t.bold, t.h4SM]}>ABUBU WORLD</Text>
          <Text style={[t.textCtr, t.light]}>
            (Mua bán cùng bạn bè và đối tác)
          </Text>
        </View>
      </TourGuideZone>
    </View>
  );
};

export default React.memo(AbubuWorld);
