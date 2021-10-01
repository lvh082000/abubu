import FastImage, {FastImageProps} from 'react-native-fast-image';
import React, {useCallback, useState} from 'react';
import {Fade, Placeholder, PlaceholderMedia} from 'rn-placeholder';

const NetImage = ({style, ...rest}: FastImageProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const onProgress = useCallback(() => {
    if (!isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  return (
    <FastImage
      style={style}
      onProgress={onProgress}
      onLoadEnd={onLoadEnd}
      onError={onLoadEnd}
      {...rest}>
      {isLoading && (
        <Placeholder Animation={Fade}>
          <PlaceholderMedia style={style} />
        </Placeholder>
      )}
    </FastImage>
  );
};

export default React.memo(NetImage);

export const NetImageStatic = {
  priority: FastImage.priority,
  preload: FastImage.preload,
  resizeMode: FastImage.resizeMode,
  cacheControl: FastImage.cacheControl,
};
