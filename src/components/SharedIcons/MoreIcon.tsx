import VectorIcon, {IconType} from 'components/VectorIcon';
import {useBottomAction} from 'hooks/useBottomAction';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {l, c} from 'styles/shared';

interface Props {
  onSelect: (index: number) => void;
  options: Array<string>;
}

export const MoreIcon = React.memo(({options, onSelect}: Props) => {
  const {showBottomActions} = useBottomAction();

  const onPress = useCallback(() => {
    showBottomActions(
      {
        options: options,
      },
      index => onSelect(index),
    );
  }, [options]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[{width: 30}, l.ml15]}>
      <VectorIcon
        size={30}
        color={c.white}
        name="more-horiz"
        type={IconType.material}
      />
    </TouchableOpacity>
  );
});
