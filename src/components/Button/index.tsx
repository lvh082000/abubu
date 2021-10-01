import {TouchableOpacity, ViewStyle, TextStyle, StyleProp} from 'react-native';
import React, {useMemo} from 'react';
import {ButtonStyles} from 'styles/elements';
import Text from 'components/Text';
import {Flow} from 'react-native-animated-spinkit';
import {c} from 'styles/shared';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariants =
  | 'primary'
  | 'primaryOutline'
  | 'secondary'
  | 'secondaryOutline'
  | 'custom';

interface Props {
  size?: ButtonSize;
  variant?: ButtonVariants;
  title?: string;
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };

  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  rightComponent?: JSX.Element;
}

const Button = ({
  size,
  variant,
  title,
  widgetStyles,
  onPress,
  isLoading = false,
  disabled = false,
  rightComponent,
}: Props) => {
  const buttonThemes = useMemo(() => {
    let viewStyle: StyleProp<ViewStyle>, textStyle: StyleProp<TextStyle>;
    switch (variant) {
      case 'primary':
        viewStyle = {
          backgroundColor: c.green800,
          borderWidth: 0,
        };
        textStyle = {
          color: c.white,
        };
        break;
      case 'primaryOutline':
        viewStyle = {
          backgroundColor: c.white,
          borderWidth: 2,
          borderColor: c.green800,
        };
        textStyle = {
          color: c.green800,
        };
        break;
      case 'secondary':
        viewStyle = {
          backgroundColor: c.blue500,
          borderWidth: 0,
        };
        textStyle = {
          color: c.white,
        };
        break;
      case 'secondaryOutline':
        viewStyle = {
          backgroundColor: c.white,
          borderWidth: 2,
          borderColor: c.blue500,
        };
        textStyle = {
          color: c.blue500,
        };
        break;
      default:
        break;
    }
    return {
      viewStyle,
      textStyle,
    };
  }, [variant]);

  const renderRightComponent = () => {
    if (rightComponent) {
      return rightComponent;
    }
    return null;
  };

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        ButtonStyles.container,
        widgetStyles?.container,
        {
          marginHorizontal: size === 'sm' ? 0 : size === 'lg' ? 0 : 50,
        },
        buttonThemes.viewStyle,
      ]}>
      {!isLoading && (
        <Text
          style={[
            ButtonStyles.text,
            widgetStyles?.text,
            buttonThemes.textStyle,
          ]}>
          {title}
        </Text>
      )}
      {isLoading && <Flow size={45} color={c.white} />}
      {renderRightComponent()}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
