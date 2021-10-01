import DeviceHelper from 'config/DeviceHelper';
import {PixelRatio} from 'react-native';

// based on iphone 11's scale
const scale = DeviceHelper.width / DeviceHelper.defaultScreenWidth;

function normalize(size: number) {
  const newSize = size * scale;
  const fontSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
  if (fontSize <= 12) {
    return size;
  }
  return fontSize;
}

const Winston = {
  Bold: 'Winston-Bold' as const,
  Semi: 'Winston-SemiBold' as const,
  Medium: 'Winston-Medium' as const,
  Regular: 'Winston-Regular' as const,
  Light: 'Winston-Light' as const,
  ExtraBold: 'Winston-ExtraBold' as const,
};

export const text = {
  bold: {
    fontWeight: '700' as const,
    fontFamily: 'Winston-Bold' as const,
  },
  semi: {
    fontWeight: '600' as const,
    fontFamily: 'Winston-SemiBold' as const,
  },
  medium: {
    fontWeight: '500' as const,
    fontFamily: 'Winston-Medium' as const,
  },
  regular: {
    fontWeight: '400' as const,
    fontFamily: 'Winston-Regular' as const,
  },
  light: {
    fontWeight: '300' as const,
    fontFamily: 'Winston-Light' as const,
  },
  fontFamily: {
    Winston,
  },
  h0: {
    fontSize: normalize(50),
    fontWeight: '700' as const,
  },
  h1LG: {
    fontSize: normalize(40),
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: normalize(38),
    fontWeight: '700' as const,
  },
  h1SM: {
    fontWeight: '700' as const,
    fontSize: normalize(36),
    lineHeight: 42, // Android creates a diff line height than iOS, usually not an issue except on larger fonts, so we set it here
  },
  h2LG: {
    fontSize: normalize(34),
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: normalize(32),
    fontWeight: '700' as const,
  },
  h2SM: {
    fontSize: normalize(30),
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: normalize(28),
    fontWeight: '700' as const,
  },
  h3SM: {
    fontSize: normalize(26),
    fontWeight: '700' as const,
  },
  h4LG: {
    fontSize: normalize(24),
    fontWeight: '700' as const,
  },
  h4: {
    fontSize: normalize(22),
    fontWeight: '700' as const,
  },
  h4SM: {
    fontSize: normalize(20),
  },
  h5LG: {
    fontSize: normalize(18),
  },
  h5: {
    fontSize: normalize(16),
  },
  p: {
    fontSize: normalize(14),
  },
  pSM: {
    fontSize: normalize(12),
  },
  pXS: {
    fontSize: normalize(10),
  },
  pXXS: {
    fontSize: normalize(8),
  },
  textCtr: {
    textAlign: 'center' as const,
  },
  textLeft: {
    textAlign: 'left' as const,
  },
  textRight: {
    textAlign: 'right' as const,
  },
  underline: {
    textDecorationLine: 'underline' as const,
  },
};
