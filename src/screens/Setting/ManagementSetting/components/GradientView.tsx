import Text from 'components/Text';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {c, l, t} from 'styles/shared';

interface Props {
  title?: string;
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    ...l.justifyCtr,
    ...l.mx20,
    borderRadius: 7,
  },
  text: {
    ...l.pl10,
    ...t.h5,
    ...t.medium,
  },
});

const GradientView = ({title, widgetStyles}: Props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#11655D', '#5AACA5']}
      style={[styles.container, widgetStyles?.container]}>
      <View>
        <Text
          style={[
            styles.text,
            widgetStyles?.text,
            {
              color: c.white,
            },
          ]}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default GradientView;
