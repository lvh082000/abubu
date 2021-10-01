import {CustomFlatList} from 'components/CustomScrollableView';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import React from 'react';
import {View} from 'react-native';
import {generateArray} from 'services/UtilService';
import {l} from 'styles/shared';
import NotificationItem from './components/NotificationItem';

const data = generateArray(20);

const Notification = () => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <NotificationItem key={index} item={item} type="test" />;
  };

  const renderContent = () => {
    return (
      <CustomFlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={data}
      />
    );
  };

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thông báo"
      />
      {renderContent()}
      <GradientButton
        widgetStyles={{container: [l.mb10]}}
        variant="primary"
        title="LƯU"
        onPress={() => {}}
      />
    </View>
  );
};

export default Notification;
