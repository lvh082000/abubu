import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {BarcodeMaskWithOuterLayout} from '@npt/react-native-barcode-mask';
import {l, c} from 'styles/shared';
import {useNavigation} from '@react-navigation/native';
import NavigationService from 'services/NavigationService';
import Text from 'components/Text';

import styles from './styles';

const QRCodeScanner = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const onBarcodeRead = ({data}: BarCodeReadEvent) => {
    NavigationService.goBack(1, {result: data});
  };

  const goBack = () => {
    NavigationService.goBack();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        setLoading(true);
      }),

    [navigation],
  );

  return (
    <View style={[l.flex, {backgroundColor: c.black1000}]}>
      {!isLoading && (
        <RNCamera
          style={[l.flex, l.alignCtr, l.justifyEnd]}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}>
          <BarcodeMaskWithOuterLayout
            maskOpacity={0.5}
            width={250}
            height={250}
          />
        </RNCamera>
      )}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRCodeScanner;
