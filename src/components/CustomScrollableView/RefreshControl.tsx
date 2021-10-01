import React, {FC, useCallback, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Dayjs from 'dayjs';
// @ts-ignore
import {SmartRefresh, SmartRefreshHeader} from 'react-native-smart-refresh';
import Text from 'components/Text';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
}

const NormalRefreshHeader: FC<Props> = ({refreshing, children, onRefresh}) => {
  const [title, setTitle] = useState('Kéo xuống để cập nhật');
  const [lastTime, setLastTime] = useState(Dayjs().format('HH:mm'));

  const onPullingRefreshCallBack = useCallback(() => {
    setTitle('Thả ra để cập nhật');
  }, []);

  const onRefreshCallBack = useCallback(() => {
    onRefresh && onRefresh();
    setLastTime(Dayjs().format('HH:mm'));
    setTitle('Đang tải');
  }, [onRefresh]);

  const onIdleRefreshCallBack = useCallback(() => {
    setTitle('Kéo xuống để cập nhật');
  }, []);

  const onChangeStateCallBack = useCallback(event => {
    const {state} = event.nativeEvent;
    switch (state) {
      case 0:
        onIdleRefreshCallBack();
        break;
      case 1:
        onPullingRefreshCallBack();
        break;
      case 2:
        onRefreshCallBack();
        break;
      default:
    }
  }, []);
  return (
    <SmartRefresh refreshing={refreshing} onChangeState={onChangeStateCallBack}>
      <SmartRefreshHeader style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator
              style={{opacity: refreshing ? 1 : 0}}
              animating={true}
              size={15}
              hidesWhenStopped={true}
              color={'#333'}
            />
            <Text style={styles.titleStyle}>{title}</Text>
          </View>
          <Text style={styles.timeStyle}>{`Đã cập nhật: ${lastTime}`}</Text>
        </View>
      </SmartRefreshHeader>
      {children}
    </SmartRefresh>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  timeStyle: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(NormalRefreshHeader);
