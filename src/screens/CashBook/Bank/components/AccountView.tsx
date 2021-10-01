import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';

interface Props {}

const styles = StyleSheet.create({
  accountContainer: {
    ...l.flex,
    ...l.mr5,
    ...l.mt10,
    ...l.px10,
    ...l.py5,
    borderWidth: 1,
    borderColor: c.green800,
    borderRadius: 5,
  },
});

export const AccountView = React.memo(({}: Props) => {
  return (
    <View style={styles.accountContainer}>
      <View style={[l.flexRow, l.justifyBtw, l.mb10]}>
        <Text
          style={[
            {color: c.black200, fontFamily: t.fontFamily.Winston.Medium},
          ]}>
          Tài khoản
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <VectorIcon
            type={IconType.antDesign}
            name="plus"
            color={c.black200}
          />
        </TouchableOpacity>
      </View>

      <View style={[l.flex, l.flexRow, l.justifyBtw]}>
        <Text
          style={[
            {color: c.black200, fontFamily: t.fontFamily.Winston.Medium},
          ]}>
          0123456789
        </Text>

        <View style={[l.flexRow]}>
          <TouchableOpacity activeOpacity={0.7}>
            <VectorIcon
              type={IconType.antDesign}
              name="caretdown"
              color={c.black200}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[l.ml10]}>
            <VectorIcon type={IconType.entypo} name="edit" color={c.black200} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
