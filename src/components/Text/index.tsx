import React, {FC} from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {t} from 'styles/shared';
import findLast from 'lodash/findLast';

const Text: FC<TextProps> = ({children, style, ...rest}) => {
  if (typeof children === 'string' && !children) {
    return null;
  }
  const textStyle = (Array.isArray(style) ? style : [style]).filter(v => !!v);
  const fontStyle = findLast(textStyle, (v: any) => v.fontFamily);
  return (
    <RNText
      {...rest}
      textBreakStrategy={'simple'}
      allowFontScaling={false}
      style={[
        textStyle,
        {
          fontFamily: fontStyle
            ? //@ts-ignore
              fontStyle.fontFamily
            : t.fontFamily.Winston.Medium,
        },
      ]}>
      {children}
    </RNText>
  );
};

export default Text;
