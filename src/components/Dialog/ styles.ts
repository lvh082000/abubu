import {StyleSheet} from 'react-native';
import {l, c, t} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    ...l.flexCenter,
    paddingHorizontal: 20,
  },
  wrapper: {
    backgroundColor: c.white,
    borderRadius: 15,
    width: '100%',
    position: 'relative',
    ...l.alignCtr,
  },
  header: {
    ...l.py15,
  },
  title: {
    ...t.textCtr,
    ...t.h4SM,
    ...t.bold,
    ...l.mt20,
    color: c.black1000,
  },
  content: {
    ...l.px20,
    ...l.pb20,
    ...l.flexCenter,
    alignSelf: 'stretch',
  },
  message: {
    ...l.mb30,
    ...t.medium,
    ...t.h5,
    ...t.textCtr,
    color: c.black200,
  },
  button: {
    ...l.flexCenter,
    ...l.py10,
    ...l.mt10,
    width: '60%',
    borderRadius: 25,
  },
  buttonText: {
    color: c.white,
    ...t.bold,
  },
  iconContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: -25,
    borderRadius: 25,
    ...l.flexCenter,
    borderColor: c.white,
    borderWidth: 4,
  },
});

export default styles;
