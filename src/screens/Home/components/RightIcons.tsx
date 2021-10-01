import {QuestionIcon} from 'components/SharedIcons';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {c, l} from 'styles/shared';

interface Props {
  onQuestion?: () => void;
  onNotification?: () => void;
}

export const RightIcons = ({onNotification, onQuestion}: Props) => {
  return (
    <View style={[l.flexRow]}>
      <QuestionIcon onPress={onQuestion} style={l.mr10} />

      <TouchableOpacity onPress={onNotification} activeOpacity={0.7}>
        <VectorIcon
          color={c.white}
          size={25}
          type={IconType.material}
          name={'notifications'}
        />
      </TouchableOpacity>
    </View>
  );
};
