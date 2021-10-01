import DeviceHelper from 'config/DeviceHelper';
import {StyleSheet} from 'react-native';
import {t, l, c} from 'styles/shared';

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    width: DeviceHelper.width,
    height: 50,
    bottom: 50,
    ...l.flexCenter,
  },
  button: {
    backgroundColor: c.white,
    ...l.flex,
    ...l.flexCenter,
    width: 150,
    borderRadius: 10,
    height: 50,
  },
  buttonText: {
    color: c.green800,
    ...t.h5,
    ...t.bold,
  },
});

export default styles;
