import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import DeviceHelper from 'config/DeviceHelper';

export const useKeyboardListener = () => {
  const eventShow = DeviceHelper.isIOS ? 'keyboardWillShow' : 'keyboardDidShow';
  const eventHide = DeviceHelper.isIOS ? 'keyboardWillHide' : 'keyboardDidHide';
  useEffect(() => {
    const _show = Keyboard.addListener(eventShow, keyboardDidShow);
    const _hide = Keyboard.addListener(eventHide, keyboardDidHide);

    // cleanup function
    return () => {
      _show.remove();
      _hide.remove();
    };
  }, [eventHide, eventShow]);

  const [visible, setKeyboardStatus] = useState(false);
  const keyboardDidShow = () => setKeyboardStatus(true);
  const keyboardDidHide = () => setKeyboardStatus(false);

  return visible;
};
