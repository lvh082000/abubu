import React, {useState} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {c} from 'styles/shared';
import {CheckboxStyles} from 'styles/elements';
import Text from 'components/Text';

interface Props {
  checked: boolean;
  onCheck?: (checked: boolean) => void;
  widgetStyles?: {
    container?: StyleProp<ViewStyle> | undefined;
    text?: StyleProp<TextStyle> | undefined;
    checkbox?: StyleProp<ViewStyle> | undefined;
  };
  label?: string;
  rightComponent?: () => JSX.Element;
  revert?: boolean;
}

export const Checkbox = ({
  checked = true,
  onCheck,
  widgetStyles,
  label,
  rightComponent,
  revert = false,
}: Props) => {
  const [value, setValue] = useState<boolean>(checked);

  const onToggle = () => {
    setValue(!value);
    onCheck?.(!value);
  };

  const renderRightComponent = () => {
    if (!rightComponent) {
      return null;
    }
    return rightComponent();
  };

  const renderContent = () => {
    if (revert) {
      return (
        <>
          <View style={[CheckboxStyles.checkbox, widgetStyles?.checkbox]}>
            {!!value && (
              <VectorIcon
                color={c.green400}
                size={18}
                type={IconType.materialCommunity}
                name={'check-bold'}
              />
            )}
          </View>
          {label && (
            <Text style={[CheckboxStyles.text, widgetStyles?.text]}>
              {label}
            </Text>
          )}
        </>
      );
    }
    return (
      <>
        {label && (
          <Text style={[CheckboxStyles.text, widgetStyles?.text]}>{label}</Text>
        )}
        <View style={[CheckboxStyles.checkbox, widgetStyles?.checkbox]}>
          {!!value && (
            <VectorIcon
              color={c.green400}
              size={18}
              type={IconType.materialCommunity}
              name={'check-bold'}
            />
          )}
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[CheckboxStyles.container, widgetStyles?.container]}
      onPress={onToggle}
      activeOpacity={0.7}>
      {renderContent()}

      {renderRightComponent()}
    </TouchableOpacity>
  );
};
