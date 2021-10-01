import {StyleSheet} from 'react-native';
import {c, t, l} from 'styles/shared';

export const ImageSelectorSize = 100;

const styles = StyleSheet.create({
  container: {},
  circleContainer: {
    borderRadius: ImageSelectorSize / 2,
  },
  squareContainer: {
    borderRadius: 20,
  },
  image: {
    width: ImageSelectorSize,
    height: ImageSelectorSize,
    borderRadius: 20,
  },
  itemContainer: {
    ...l.flexCenter,
    width: ImageSelectorSize,
    height: ImageSelectorSize,
    borderRadius: 20,
    ...l.mx5,
    position: 'relative',
    overflow: 'visible',
  },
  removeButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    position: 'absolute',
    right: -5,
    top: -10,
    zIndex: 2,
  },
  selectorContainer: {
    backgroundColor: c.white,
    width: ImageSelectorSize,
    height: ImageSelectorSize,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    ...l.flexCenter,
    marginTop: 3,
    marginBottom: 4,
  },
});

export default styles;
