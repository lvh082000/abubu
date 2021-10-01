import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import {l} from 'styles/shared';
import ImageSelector from 'components/ImageSelector';
import {Results} from '@baronha/react-native-multiple-image-picker';
import {CreateOrUpdateProductFormValues as FormValues} from 'types/Properties';
import {UploadedFileParams} from 'types/Params';

export const ProductImagesUploader = React.memo(
  ({images}: {images?: Array<string> | undefined}) => {
    const {setFieldValue} = useFormikContext<FormValues>();

    const onUpload = useCallback((data: Array<Results>) => {
      const uploadedImages: Array<UploadedFileParams> = data.map(v => {
        return {
          uri: v.path,
          name: v.filename,
          type: v.mime,
        };
      });
      setFieldValue('uploadedImages', uploadedImages);
    }, []);

    const onRemove = useCallback(
      (data: Array<Results>) => {
        const resultImages = data.map(v => v.path);
        const removedImages = images?.filter(v => !resultImages.includes(v));
        setFieldValue('removedImages', removedImages);
      },
      [images],
    );

    return (
      <View style={[l.flexCenter, l.mb10, l.mt30]}>
        <ImageSelector
          images={images}
          type="square"
          onUpload={onUpload}
          onRemove={onRemove}
          max={3}
        />
      </View>
    );
  },
);
