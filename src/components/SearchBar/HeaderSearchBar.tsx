import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {c, l, t} from 'styles/shared';

interface Props {
  onClose: () => void;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (value: string) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.pb15,
  },
  input: {
    backgroundColor: c.white,
    ...l.flex,
    height: 45,
    borderRadius: 45 / 2,
    ...l.ml15,
    ...l.px10,

    fontFamily: t.fontFamily.Winston.Medium,
  },
});

export const HeaderSearchBar = React.memo(
  ({onChangeText, onSubmitEditing, onClose}: Props) => {
    const {top} = useSafeAreaInsets();
    const textSearch = useRef('');

    const _onChangeText = useCallback(
      (text: string) => {
        textSearch.current = text;
        onChangeText?.(text);
      },
      [onChangeText],
    );

    const _onSubmitEditing = useCallback(() => {
      onSubmitEditing?.(textSearch.current);
    }, [onSubmitEditing]);

    return (
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={['#11655D', '#09332F']}>
        <View style={[styles.container, {marginTop: top}]}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <VectorIcon
              size={25}
              type={IconType.entypo}
              name={'arrow-with-circle-left'}
              color={c.white}
            />
          </TouchableOpacity>
          <TextInput
            returnKeyType="search"
            style={styles.input}
            placeholder="Tìm kiếm..."
            onChangeText={_onChangeText}
            onSubmitEditing={_onSubmitEditing}
            placeholderTextColor={c.black100}
          />
        </View>
      </LinearGradient>
    );
  },
);
