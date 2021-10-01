import {GradientHeader} from 'components/Header';
import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import AddButton from 'components/AddButton';
import NavigationService from 'services/NavigationService';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {PrimarySearchBar} from 'components/SearchBar';
import SelectRoomItem from './components/SelectRoomItem';
import {l} from 'styles/shared';
import {OrderType} from 'types/Properties';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {fetchDeleteRoom, RoomsSelector} from 'store/Order';
import {useFetch} from 'hooks/useFetch';
import {OrderService} from 'services/OrderService';
import LoadingView from 'components/LoadingView';
import {OrderedRoomItemType} from 'types/Responses/FetchGetOrderedRoomResponse';
import {RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<TransactionStackParams, TransactionScreenID.SelectRooms>;
}

const SelectRooms = ({route: {params}}: Props) => {
  const rooms = useAppSelector(RoomsSelector());
  const dispach = useAppDispatch();
  const {data, isLoading} = useFetch<OrderedRoomItemType[]>(
    OrderService.fetchGetOrderedRoom,
  );
  const onCreateOrder = useCallback(id => {
    if (params?.useSelect) {
      NavigationService.goBack(1, {result: id});
    } else {
      NavigationService.replace(TransactionScreenID.CreateOrder, {
        type: OrderType.BookByRoom,
        roomId: id,
      });
    }
  }, []);

  const onAddRoom = useCallback(() => {
    NavigationService.pushToScreen(TransactionScreenID.CreateOrUpdateRoom);
  }, []);

  const onItemPress = useCallback((item: {id: number; code: string}) => {
    NavigationService.pushToScreen(TransactionScreenID.BookByRoomOrderDetails, {
      id: item.id,
      code: item.code,
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispach(fetchDeleteRoom(id));
  }, []);

  const renderItem = (item: {id: number; name: string}, index: number) => {
    const value = data?.find(v => v.id === item.id);

    return (
      <SelectRoomItem
        onDelete={onDelete}
        onItemPress={onItemPress}
        onCreate={() => onCreateOrder(item.id)}
        index={index}
        item={item}
        key={index}
        orders={value?.waiting ?? []}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    return (
      <>
        <PrimarySearchBar placeholder="Tìm kiếm theo bàn hoặc vị trí" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={l.flex}
          bounces={false}>
          {rooms.map(renderItem)}
        </ScrollView>
      </>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Danh Sách Bàn Trống"
      />
      {renderContent()}
      <AddButton onPress={onAddRoom} />
    </View>
  );
};

export default SelectRooms;
