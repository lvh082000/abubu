import Modal from 'react-native-modal';
import React, {useRef} from 'react';
import Text from 'components/Text';
import {TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {DialogParams, DialogType} from './DialogProvider';
import DeviceHelper from 'config/DeviceHelper';
import VectorIcon, {IconType} from 'components/VectorIcon';
import styles from './ styles';
import Button from 'components/Button';

interface Props extends DialogParams {
  visible: boolean;
  onRequestClose: () => void;
  onModalClosed?: () => void;
  onModalConfirm?: () => void;
  canCloseByBackdrop?: boolean;
}

const colors = {
  warning: '#ffc107',
  error: '#dc3545',
  success: '#28a745',
  confirmation: '#008DDD',
  info: c.green800,
};

const useDialogTheme = (type: DialogType) => {
  const themeType = type?.toLocaleLowerCase();
  // @ts-ignore
  const themeColor = colors[themeType];

  if (type === 'Confirmation') {
    return {
      viewStyle: {backgroundColor: themeColor},
      color: themeColor,
    };
  }

  return {
    viewStyle: {backgroundColor: themeColor},
    color: themeColor,
  };
};

const DialogButton = ({
  type,
  onPress,
}: {
  type: DialogType;
  onPress: () => void;
}) => {
  if (type === 'Confirmation') {
    return (
      <Button
        widgetStyles={{container: l.fullWidth}}
        size="sm"
        variant="secondary"
        onPress={onPress}
        title="Xác nhận"
      />
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Text style={[t.bold, t.h5]}>Đóng</Text>
    </TouchableOpacity>
  );
};

const DialogTitle = React.memo(
  ({type, title}: {type: DialogType; title: string}) => {
    const {color} = useDialogTheme(type);

    let value = title;
    if (!value) {
      switch (type) {
        case 'Confirmation':
          value = 'Xác Nhận';
          break;
        case 'Error':
          value = 'Lỗi';
          break;
        case 'Warning':
          value = 'Chú Ý';
          break;
        case 'Info':
          value = 'Thông Tin';
          break;
        case 'Success':
          value = 'Thành Công';
          break;
      }
    }

    return (
      <View style={[styles.header]}>
        <Text style={[styles.title, {color: color}]}>{value}</Text>
      </View>
    );
  },
);

const DialogIcon = React.memo(({type}: {type: DialogType}) => {
  const {viewStyle} = useDialogTheme(type);
  let nameIcon = 'check';
  switch (type) {
    case 'Confirmation':
      nameIcon = 'question';
      break;
    case 'Error':
      nameIcon = 'exclamation';
      break;
    case 'Warning':
      nameIcon = 'info';
      break;
    case 'Info':
      nameIcon = 'question';
      break;
  }
  return (
    <View style={[styles.iconContainer, viewStyle]}>
      <VectorIcon
        color={c.white}
        type={IconType.fontAwesome}
        name={nameIcon}
        size={30}
      />
    </View>
  );
});

const Dialog = ({
  visible,
  title,
  type,
  message,
  onModalConfirm,
  onModalClosed,
  onRequestClose,
  canCloseByBackdrop = true,
}: Props) => {
  const isOKPressed = useRef(false);

  const close = () => {
    onRequestClose();
  };

  const onModalHide = () => {
    if (isOKPressed.current) {
      onModalConfirm?.();
    } else {
      onModalClosed?.();
    }
    isOKPressed.current = false;
  };

  const onConfirm = () => {
    isOKPressed.current = true;
    close();
  };

  const onBackdropPress = () => {
    if (canCloseByBackdrop) {
      close();
    }
  };

  return (
    <Modal
      onModalHide={onModalHide}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
      deviceHeight={DeviceHelper.height}
      statusBarTranslucent={true}
      isVisible={visible}>
      <View style={styles.wrapper}>
        <DialogIcon type={type} />
        <DialogTitle title={title as string} type={type} />
        <View style={styles.content}>
          {message && <Text style={[styles.message]}>{message}</Text>}
          <DialogButton type={type} onPress={onConfirm} />
          {type === 'Confirmation' && (
            <Button
              widgetStyles={{container: [l.fullWidth, l.mt10]}}
              size="sm"
              variant="secondaryOutline"
              onPress={close}
              title="Hủy bỏ"
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Dialog);
