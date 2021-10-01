import {
  useActionSheet,
  ActionSheetOptions,
} from '@npt/react-native-action-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {t, c} from 'styles/shared';
import {Keyboard} from 'react-native';

export const useBottomAction = () => {
  const {showActionSheetWithOptions} = useActionSheet();
  const {bottom} = useSafeAreaInsets();

  return {
    showBottomActions: (
      props: ActionSheetOptions,
      callback: (i: number) => void,
    ) => {
      Keyboard.dismiss();
      showActionSheetWithOptions(
        {
          ...props,
          options: [...props.options, 'Đóng'],
          cancelButtonIndex: props.options.length,
          destructiveButtonIndex: props.options.length,
          containerStyle: {
            paddingBottom: bottom,
          },
          destructiveColor: c.blue600,
          textStyle: {
            fontFamily: t.fontFamily.Winston.Bold,
            ...t.h5LG,
          },
          initialIndex: props.initialIndex,
        },
        index => {
          if (index === props.options.length) {
            return;
          }
          // @ts-ignore
          callback(index);
        },
      );
    },
  };
};
