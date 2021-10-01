import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import MultipleImagePicker, {
  Results,
} from '@baronha/react-native-multiple-image-picker';
import DeviceHelper from 'config/DeviceHelper';
import {l, c} from 'styles/shared';
import {SelectedImageItem} from './SelectedImageItem';
import {CameraSelectedButton} from './CameraSelectedButton';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';

interface Props {
  images?: Array<string> | undefined;
  type?: 'square' | 'circle';
  max?: number;
  style?: StyleProp<ViewStyle>;
  onUpload?: (images: Array<Results>) => void;
  onRemove?: (images: Array<Results>) => void;
}

const getAndroidFileName = (path: string) => {
  const index = path.lastIndexOf('/');
  return path.substring(index + 1, path.length);
};

const ImageSelector = React.memo(
  ({onUpload, onRemove, max = 1, style, images}: Props) => {
    const initialImages = useMemo(() => {
      if (!images || (images && images.length === 0)) {
        return [];
      }
      return images
        .filter(v => v.startsWith('http'))
        .map(v => {
          return {
            path: v,
          };
        });
    }, [images]);
    const [selectedImages, setSelectedImages] = useState<Array<Results>>(
      initialImages as Array<Results>,
    );

    const openPicker = async (maxSelectedAssets?: number) => {
      try {
        const images = await MultipleImagePicker.openPicker({
          mediaType: 'image',
          doneTitle: 'Tiếp tục',
          cancelTitle: 'Hủy',
          emptyMessage: 'Không có hình ảnh',
          messageTitleButton: 'Đóng',
          maximumMessageTitle: 'Thông báo',
          maximumMessage: `Bạn chỉ được chọn tối đa ${max} hình ảnh`,
          maxSelectedAssets: maxSelectedAssets ?? max,
          selectedColor: c.green800,
        });
        const data = images.map((v: Results) => {
          return {
            ...v,
            path: DeviceHelper.isIOS
              ? v.path.replace('file://', '')
              : //@ts-ignore
                `file://${v.realPath}`,
            //@ts-ignore
            filename: DeviceHelper.isIOS
              ? v.filename
              : //@ts-ignore
                getAndroidFileName(v.realPath),
          };
        });

        setSelectedImages([...selectedImages, ...data]);
        onUpload?.(data);
      } catch (error) {
        console.log('[ERROR] onUpload', error);
      }
    };

    const onRemoveItem = useCallback(
      (index: number) => {
        const data = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(data);
        onRemove?.(data);
      },
      [selectedImages, onRemove],
    );

    const onViewImage = useCallback(
      (index: number) => {
        NavigationService.pushToScreen(RootScreenID.PhotoViewer, {
          images: images,
          index,
        });
      },
      [images],
    );

    const renderImage = (item: Results, index: number) => {
      return (
        <SelectedImageItem
          onRemove={() => onRemoveItem(index)}
          key={index}
          index={index}
          item={item}
          onPress={() => onViewImage(index)}
        />
      );
    };

    return (
      <View>
        {selectedImages.length === 0 && (
          <CameraSelectedButton onPress={() => openPicker()} style={style} />
        )}
        {max === 1 && selectedImages.length > 0 && (
          <SelectedImageItem
            onRemove={() => onRemoveItem(0)}
            index={0}
            item={selectedImages[0]}
            onPress={() => onViewImage(0)}
          />
        )}
        {max > 1 && selectedImages.length > 0 && (
          <View style={[l.mt20, l.flexRow]}>
            {selectedImages.map(renderImage)}
            {selectedImages.length !== 0 && max - selectedImages.length > 0 && (
              <CameraSelectedButton
                onPress={() => openPicker(max - selectedImages.length)}
                style={[style, l.ml5]}
              />
            )}
          </View>
        )}
      </View>
    );
  },
);

export default ImageSelector;
