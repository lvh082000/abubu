import {IconType} from 'components/VectorIcon';
import {c} from 'styles/shared';
import {DrawerScreenID} from 'navigation/types';
import {ProductTabScreenID} from 'navigation/ProductNavigation';
import {TransactionTabScreenID} from 'navigation/TransactionNavigation';
import {PartnerTabScreenID} from 'navigation/PartnerNavigation';

const storeOptionList = [
  {
    id: 1,
    title: 'Trang chủ',
    link: DrawerScreenID.Home,
    icon: {
      name: 'home',
      size: 20,
      type: IconType.antDesign,
      color: c.white,
    },
  },
  {
    id: 2,
    title: 'Hàng hóa',
    link: DrawerScreenID.Product,
    screen: ProductTabScreenID.Products,
    icon: {
      name: 'category',
      size: 20,
      type: IconType.material,
      color: c.white,
    },
  },
  {
    id: 3,
    title: 'Kiểm kho',
    link: DrawerScreenID.Product,
    screen: ProductTabScreenID.InventoryControl,
    icon: {
      name: 'fact-check',
      size: 20,
      type: IconType.material,
      color: c.white,
    },
  },
];

const storeManagerOptionList = [
  {
    id: 1,
    title: 'Đặt hàng trực tiếp',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.TakeAway,
    icon: {
      name: 'filetext1',
      size: 20,
      type: IconType.antDesign,
      color: c.white,
    },
  },
  {
    id: 2,
    title: 'Đặt hàng ship cod',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.Shipping,
    icon: {
      name: 'truck',
      size: 20,
      type: IconType.materialCommunity,
      color: c.white,
    },
  },
  {
    id: 3,
    title: 'Đặt hàng bàn phòng',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.BookByRoom,
    icon: {
      name: 'tag-text',
      size: 20,
      type: IconType.materialCommunity,
      color: c.white,
    },
  },
  {
    id: 4,
    title: 'Trả hàng',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.ReturnProduct,
    icon: {
      name: 'reply',
      size: 20,
      type: IconType.entypo,
      color: c.white,
    },
  },
  {
    id: 5,
    title: 'Nhập hàng',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.ImportProduct,
    icon: {
      name: 'forward',
      size: 20,
      type: IconType.entypo,
      color: c.white,
    },
  },
  {
    id: 6,
    title: 'Trả hàng nhập',
    link: DrawerScreenID.Transaction,
    screen: TransactionTabScreenID.ReturnOfImportedGoods,
    icon: {
      name: 'recycle',
      size: 20,
      type: IconType.materialCommunity,
      color: c.white,
    },
  },
];

const peopleOptionList = [
  {
    id: 1,
    title: 'Khách hàng',
    link: DrawerScreenID.Partner,
    screen: PartnerTabScreenID.Customers,
    icon: {
      name: 'user',
      size: 20,
      type: IconType.fontAwesome,
      color: c.white,
    },
  },
  {
    id: 2,
    title: 'Nhà cung cấp',
    link: DrawerScreenID.Partner,
    screen: PartnerTabScreenID.Providers,
    icon: {
      name: 'users',
      size: 20,
      type: IconType.fontAwesome,
      color: c.white,
    },
  },
  {
    id: 3,
    title: 'Đối tác giao hàng',
    link: DrawerScreenID.Partner,
    icon: {
      name: 'motorcycle',
      size: 20,
      type: IconType.material,
      color: c.white,
    },
  },
];

const revenueOptionList = [
  {
    id: 1,
    title: 'Sổ quỹ',
    link: DrawerScreenID.CashBook,
    icon: {
      name: 'news',
      size: 20,
      type: IconType.entypo,
      color: c.white,
    },
  },
  {
    id: 2,
    title: 'Báo cáo',
    link: DrawerScreenID.Report,
    icon: {
      name: 'areachart',
      size: 20,
      type: IconType.antDesign,
      color: c.white,
    },
  },
];

const appOptionList = [
  {
    id: 1,
    title: 'Cài đặt',
    link: DrawerScreenID.Setting,
    icon: {
      name: 'settings-sharp',
      size: 20,
      type: IconType.ionIcon,
      color: c.white,
    },
  },
  {
    id: 2,
    title: 'Đăng xuất',
    icon: {
      name: 'logout',
      size: 20,
      type: IconType.antDesign,
      color: c.white,
    },
  },
];

export {
  storeOptionList,
  storeManagerOptionList,
  peopleOptionList,
  revenueOptionList,
  appOptionList,
};
