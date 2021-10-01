import Settings from 'config/Settings';
import {UploadedFileParams} from 'types/Params';
import ImageResizer from 'react-native-image-resizer';
import HttpService from 'services/HttpService';

const uploadFile = async (file: UploadedFileParams) => {
  try {
    const {uri} = await ImageResizer.createResizedImage(
      file.uri,
      600,
      600,
      'JPEG',
      80,
    );
    file.uri = uri;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'abubu_app');

    const response = await fetch(`${Settings.CLOUDINARY_URL}/image/upload`, {
      method: 'post',
      body: data,
    });
    const body = await response.json();
    return body.secure_url;
  } catch (error) {
    console.log('[ERROR] uploadFile', error);
  }
};

const fetchRemoveFile = async (fileURL: string) => {
  try {
    if (!fileURL.startsWith('http')) {
      return;
    }
    await HttpService.Post(
      '/media/delete',
      {url: fileURL},
      {
        dialogType: 'None',
      },
    );
  } catch (error) {
    console.log('[ERROR] fetchRemoveFile', error);
  }
};

export const FileService = {
  uploadFile,
  fetchRemoveFile,
};
