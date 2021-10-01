import React, {FC, useMemo, useState, useEffect} from 'react';
import {View, Keyboard, TouchableOpacity} from 'react-native';
import {useBottomAction} from 'hooks/useBottomAction';
import {Input, InputProps} from './Input';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {c, l} from 'styles/shared';
import {NavigationNext} from 'components/SharedIcons';

interface Option {
  name: string;
  id: number | string;
}

export interface SelectProps
  extends Omit<InputProps, 'value' | 'onChangeText'> {
  options?: Array<Option>;
  value?: number | string;
  editable?: boolean;
  type?: 'date-picker' | 'dropdown';
  displayText?: string;
  onSelectPress?: () => void;
  onSelect?: (value: number | any) => void;
}

const RightIcon = ({
  type,
  color,
  isDropdownAction,
}: {
  type: 'date-picker' | 'dropdown';
  color: string;
  isDropdownAction: boolean;
}) => {
  if (!isDropdownAction && type === 'dropdown') {
    return (
      <View style={[l.flexRow, {marginTop: 17}, l.ml5]}>
        <NavigationNext size={18} color={c.green800} />
      </View>
    );
  }
  return (
    <View style={[l.mt15, l.mr5]}>
      <VectorIcon
        size={20}
        color={color}
        name={type === 'dropdown' ? 'caret-right' : 'calendar'}
        type={IconType.fontAwesome}
      />
    </View>
  );
};

export const Select: FC<SelectProps> = ({
  options,
  value = '',
  error,
  touched,
  type = 'dropdown',
  displayText,
  onSelect,
  onSelectPress,
  ...rest
}) => {
  const {showBottomActions} = useBottomAction();
  const initialIndex = useMemo(
    () => options?.findIndex(v => v.id === value),
    [],
  );
  const [index, setIndex] = useState<number | undefined>(initialIndex);

  const onPress = () => {
    Keyboard.dismiss();
    if (options) {
      const items = options.map(v => v.name);
      showBottomActions({options: items, initialIndex: index}, buttonIndex => {
        setIndex(buttonIndex);
        onSelect?.(options[buttonIndex].id);
      });
    } else {
      onSelectPress?.();
    }
  };

  useEffect(() => {
    const valueIndex = options?.findIndex(v => v.id === value);
    if (index !== valueIndex) {
      setIndex(valueIndex);
    }
  }, [value, options, index]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Input
        {...rest}
        rightComponent={
          <RightIcon
            isDropdownAction={!!options && options.length > 0}
            color={rest.borderColor ?? c.black400}
            type={type}
          />
        }
        editable={false}
        value={displayText ?? (value as string)}
        pointerEvents="none"
        error={error}
        touched={touched}
      />
    </TouchableOpacity>
  );
};
