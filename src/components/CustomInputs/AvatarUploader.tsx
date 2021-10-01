import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import {l} from 'styles/shared';
import ImageSelector from 'components/ImageSelector';
import {Results} from '@baronha/react-native-multiple-image-picker';
import {UploadedFileParams} from 'types/Params';

interface FormValues {
  uploadedAvatar?: UploadedFileParams;
}

export const AvatarUploader = React.memo(
  ({imageURI}: {imageURI?: string | undefined}) => {
    const {setFieldValue} = useFormikContext<FormValues>();

    const onUpload = useCallback((data: Array<Results>) => {
      const images: Array<UploadedFileParams> = data.map(v => {
        return {
          uri: v.path,
          name: v.filename,
          type: v.mime,
        };
      });
      setFieldValue('uploadedAvatar', images[0]);
    }, []);

    return (
      <View style={[l.flexCenter, l.mb30, l.mt30]}>
        <ImageSelector
          images={imageURI ? [imageURI] : []}
          type="square"
          onUpload={onUpload}
          max={1}
        />
      </View>
    );
  },
);
