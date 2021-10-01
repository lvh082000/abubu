import {StyleSheet} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles,
    backgroundColor: c.green800,
  },
  sectionInfo: {
    ...l.pt5,
    ...l.pb15,
    borderBottomColor: c.grey1000,
    borderBottomWidth: 1,
  },
  textName: {
    color: c.white,
    ...t.h4SM,
    ...t.semi,
  },
  textRole: {
    color: c.grey100,
    ...l.pt5,
    ...t.light,
  },
  sectionOption: {
    ...l.py5,
    borderBottomColor: c.grey1000,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default styles;
