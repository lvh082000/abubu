import {StyleSheet} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l, t, c} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles,
    position: 'relative',
  },
  pageContainer: {
    ...l.flex,
  },
  itemContainer: {
    ...l.flex,
    ...l.alignCtr,
    marginTop: 200,
  },
  description: {
    ...t.textCtr,
    ...l.mx30,
    marginTop: 80,
    color: c.white,
    ...t.h4SM,
    fontFamily: t.fontFamily.Winston.Regular,
  },
  appName: {
    ...t.h0,
    color: c.white,
    textShadowColor: '#0C10BA',
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    ...l.alignCtr,
  },
  contentContainer: {
    ...l.flexRow,
    overflow: 'hidden',
  },
  titleContainer: {
    position: 'absolute',
    top: 80,
    width: '100%',
    ...l.alignCtr,
  },
});

export default styles;
