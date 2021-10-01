import {useDialog} from 'components/Dialog';
import Text from 'components/Text';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {c, t, l} from 'styles/shared';

interface Props {
  index?: number;
  onDelete: (index?: number) => void;
  onEdit: (index?: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const RightItemActionButtons = React.memo(
  ({index, onDelete, onEdit, style}: Props) => {
    const dialog = useDialog();

    const _onDelete = () => {
      dialog.show({
        type: 'Confirmation',
        message: 'Bạn có chắc muốn xóa dữ liệu này?',
        title: 'Xác nhận',
        onModalConfirm: () => onDelete(index),
      });
    };

    const _onEdit = () => {
      onEdit(index);
    };

    return (
      <View style={[style, l.flexRow]}>
        <TouchableOpacity style={[l.pr5]} onPress={_onEdit}>
          <Text style={[{color: c.blue600}, t.bold]}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[l.pl5]} onPress={_onDelete}>
          <Text style={[{color: c.red800}, t.bold]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  },
);
