import {StyleSheet, Dimensions} from 'react-native';
import {c, l, t} from 'styles/shared';
import DeviceHelper from 'config/DeviceHelper';
const DimensionsWidth = Dimensions.get('window').width;

export const InputStyles = StyleSheet.create({
  container: {
    ...l.mb20,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.pl15,
    ...l.pr15,
    backgroundColor: c.white100,
    width: '100%',
    height: 55,
    borderRadius: 25,
    overflow: 'hidden',
  },
  input: {
    ...t.h5,
    ...l.flex,
    height: '100%',
    color: c.black400,
  },
  errorMsg: {
    ...l.mb15,
    color: c.red800,
    marginTop: -10,
  },
});

export const SelectStyles = StyleSheet.create({
  container: {
    ...InputStyles.container,
    ...l.justifyBtw,
  },
  placeholder: {
    color: c.black200,
    fontFamily: t.fontFamily.Winston.Medium,
    ...l.ml5,
    ...t.h5,
  },
  input: {
    color: c.black400,
    ...t.bold,
    ...l.ml5,
    ...t.h5,
  },
});

export const ButtonStyles = StyleSheet.create({
  container: {
    borderRadius: 25,
    ...l.flexCenter,
    backgroundColor: c.white,
    height: 45,
    ...l.mx50,
    ...l.flexRow,
  },
  text: {
    color: c.green800,
    fontFamily: t.fontFamily.Winston.Bold,
    ...t.h5,
  },
});

export const CheckboxStyles = StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    ...l.flexCenter,
    borderRadius: 4,
    ...l.ml5,
    backgroundColor: c.white,
  },
  container: {
    ...l.mb20,
    ...l.flexRow,
    ...l.alignCtr,
  },

  text: {
    ...t.h5,
    ...t.medium,
    fontFamily: t.fontFamily.Winston.Medium,
    color: c.white,
  },
});

export const CardStyles = {
  backgroundColor: c.white,
  ...l.py30,
  ...l.px20,
  ...l.m20,
  borderRadius: 7,
};
export const ContainerStyles = {
  flex: 1,
  backgroundColor: c.white,
};

export const BoxShadowStyles = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
  elevation: 1,
  marginBottom: 1,
};

export const WrapperShadowStyles = {
  flex: 1,
  marginTop: 1,
};

export const RadiusSmall = {
  borderRadius: 5,
  overflow: 'hidden' as const,
};

export const BannerStaticStyles = {
  width: DeviceHelper.width,
  height: 220,
};

export const LayoutSliderStyles = {
  width: Math.round(DeviceHelper.width - 40),
  height: 220,
};

export const IconImageStyles = {width: 25, height: 25};

export const BlurAndroidText = {
  textShadowColor: 'rgba(0,0,0,0.7)',
  textShadowOffset: {
    width: 0,
    height: 0,
  },
  textShadowRadius: 20,
  color: '#1110',
};

export const DefaultMediaSize = {
  height: DimensionsWidth * (9 / 16),
  width: DimensionsWidth,
};

export const ImageHeaderInformationStyles = StyleSheet.create({
  container: {
    ...l.alignCtr,
    ...l.mb10,
  },
  wrapper: {
    width: DeviceHelper.width - 40,
    backgroundColor: c.white,
    borderRadius: 10,
    ...l.p15,
    ...BoxShadowStyles,
    ...l.pb0,
  },
  title: {
    ...t.h5,
    ...t.bold,
    ...l.mb10,
  },
});

export const AuthInputStyleProps = {
  hintTextColor: c.grey100,
  focusedColor: c.white,
  borderColor: '#D7E613',
  textColor: c.white,
};

export const ModalFullPageStyles = {
  ...l.p0,
  ...l.m0,
  ...l.justifyStrt,
  backgroundColor: c.white,
};
