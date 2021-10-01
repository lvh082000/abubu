import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import {c} from 'styles/shared';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({goBack}: {goBack?: () => void}) => {
  const navigation = useNavigation();

  const onPress = () => {
    Keyboard.dismiss();
    if (goBack) {
      goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <VectorIcon
        size={25}
        type={IconType.entypo}
        name={'arrow-with-circle-left'}
        color={c.white}
      />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton);
