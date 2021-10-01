import Text from 'components/Text';
import {View, TouchableOpacity, Image} from 'react-native';
import React, {useCallback} from 'react';
import {c, t, l} from 'styles/shared';
import {StyleSheet} from 'react-native';
import {TourGuideZone} from 'rn-tourguide';
import DeviceHelper from 'config/DeviceHelper';
import Constants from 'config/Constants';
import {DrawerScreenID} from 'navigation/types';
import NavigationService from 'services/NavigationService';
import {ProductTabScreenID} from 'navigation/ProductNavigation';
import {TransactionTabScreenID} from 'navigation/TransactionNavigation';
import {PartnerTabScreenID} from 'navigation/PartnerNavigation';
import {ReportTabScreenID} from 'navigation/ReportNavigation';
import {EmployeeManagementTabScreenID} from 'navigation/EmployeeManagementNavigation';
import {CashBookTabScreenID} from 'navigation/CashBookNavigation';
import {useAppSelector} from 'hooks/useRedux';
import {CurrentStoreSelector} from 'store/Me';
import {useDialog} from 'components/Dialog';

type ItemType = {
  name: string;
  link: string;
  image: number;
  description: string;
  screen: string;
};

interface MenuItemProps {
  item: ItemType;
  index: number;
}

const data = [
  {
    name: 'Hàng hóa',
    link: DrawerScreenID.Product,
    image: require('../../../assets/images/product.png'),
    description: Constants.AppTours[1],
    screen: ProductTabScreenID.Products,
  },
  {
    name: 'Giao dịch',
    link: DrawerScreenID.Transaction,
    image: require('../../../assets/images/rocket.png'),
    description: Constants.AppTours[2],
    screen: TransactionTabScreenID.TakeAway,
  },
  {
    name: 'Đối tác',
    link: DrawerScreenID.Partner,
    image: require('../../../assets/images/partner.png'),
    description: Constants.AppTours[3],
    screen: PartnerTabScreenID.Customers,
  },
  {
    name: 'Quản lý nhân viên',
    link: DrawerScreenID.EmployeeManagement,
    image: require('../../../assets/images/people.png'),
    description: Constants.AppTours[4],
    screen: EmployeeManagementTabScreenID.Employess,
  },
  {
    name: 'Sổ quỹ',
    link: DrawerScreenID.CashBook,
    image: require('../../../assets/images/calculator.png'),
    description: Constants.AppTours[5],
    screen: CashBookTabScreenID.Cash,
  },
  {
    name: 'Báo cáo',
    link: DrawerScreenID.Report,
    image: require('../../../assets/images/chart.png'),
    description: Constants.AppTours[6],
    screen: ReportTabScreenID.Sale,
  },
];

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.wrap,
    ...l.mt20,
  },
  itemContainer: {
    width: DeviceHelper.width / 3,
    ...l.flexCenter,
  },
  title: {
    ...t.textCtr,
    ...l.mt10,
    ...t.h5,
    ...t.semi,
    color: c.black1000,
    width: 80,
  },
  image: {
    width: 60,
    height: 50,
  },
});

const MenuItem = React.memo(({item, index}: MenuItemProps) => {
  const dialog = useDialog();
  const store = useAppSelector(CurrentStoreSelector());

  const onPress = useCallback(() => {
    if (store) {
      NavigationService.pushToScreen(item.link, {
        screen: item.screen,
      });
    } else {
      dialog.show({
        type: 'Error',
        message: 'Vui lòng thiết lập cửa hàng để tiếp tục',
      });
    }
  }, [store]);
  return (
    <TouchableOpacity
      onPress={onPress}
      key={index}
      style={[styles.itemContainer]}
      activeOpacity={0.7}>
      <View style={{height: index === 3 ? 20 : 0}} />
      <TourGuideZone
        borderRadius={5}
        keepTooltipPosition={true}
        style={l.flexCenter}
        zone={index + 2}
        shape="rectangle"
        text={item.description}>
        <Image
          resizeMode={'contain'}
          style={[styles.image]}
          source={item.image}
        />
        <Text style={styles.title}>{item.name}</Text>
      </TourGuideZone>
    </TouchableOpacity>
  );
});

export const MenuItems = () => {
  const renderItem = (item: ItemType, index: number) => {
    return <MenuItem key={index} index={index} item={item} />;
  };
  return <View style={styles.container}>{data.map(renderItem)}</View>;
};
