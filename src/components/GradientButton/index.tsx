import Text from 'components/Text';
import React from 'react';
import {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import LinearGradient from 'react-native-linear-gradient';
import {c, l, t} from 'styles/shared';

interface Props {
  title?: string;
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };

  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 7,
    ...l.justifyCtr,
  },
  text: {
    ...l.pl10,
    ...t.h5,
    ...t.textCtr,
    ...t.bold,
  },
});

const GradientButton = ({
  title,
  widgetStyles,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary',
}: Props) => {
  const gradientThemeColors = useMemo(() => {
    switch (variant) {
      case 'primary':
        return ['#11655D', '#5AACA5'];
      case 'danger':
        return ['#800C0C', '#FF1717'];
    }
  }, [variant]);
  return (
    <LinearGradient
      start={{x: -1, y: 0}}
      end={{x: 1, y: 0}}
      colors={gradientThemeColors}
      style={[styles.container, widgetStyles?.container]}>
      <TouchableOpacity
        disabled={isLoading || disabled}
        onPress={onPress}
        activeOpacity={0.7}>
        {!isLoading && (
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
        )}
        {isLoading && <Flow size={45} color={c.white} />}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default React.memo(GradientButton);
