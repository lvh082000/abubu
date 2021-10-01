export enum RootScreenID {
  Intro = 'RootScreen_Intro',
  Auth = 'RootScreen_Auth',
  MainDrawer = 'RootScreen_MainDrawer',
  SelectShop = 'RootScreen_SelectShop',
  Setting = 'RootScreen_Setting',
  Product = 'RootScreen_Product',
  QRCodeScanner = 'RootScreen_QRCodeScanner',
  Transaction = 'RootScreen_Transaction',
  Payment = 'RootScreen_PaymentMethod',
  OtherRevenue = 'RootScreen_OtherRevenue',
  Partner = 'RootScreen_Partner',
  Report = 'RootScreen_Report',
  EmployeeManagement = 'RootScreen_EmployeeManagement',
  CashBook = 'RootScreen_CashBook',
  PhotoViewer = 'RootScreen_PhotoViewer',
  Notification = 'RootScreen_Notification',
  Shared = 'RootSceen_Shared',
}

export type RootStackParams = {
  [RootScreenID.Auth]: undefined;
  [RootScreenID.Intro]: undefined;
  [RootScreenID.MainDrawer]: undefined;
  [RootScreenID.SelectShop]: undefined;
  [RootScreenID.Setting]: undefined;
  [RootScreenID.Product]: undefined;
  [RootScreenID.Transaction]: undefined;
  [RootScreenID.QRCodeScanner]: undefined;
  [RootScreenID.Payment]: undefined;
  [RootScreenID.OtherRevenue]: undefined;
  [RootScreenID.Partner]: undefined;
  [RootScreenID.EmployeeManagement]: undefined;
  [RootScreenID.CashBook]: undefined;
  [RootScreenID.Report]: undefined;
  [RootScreenID.PhotoViewer]: {images: Array<string>; index?: number};
  [RootScreenID.Notification]: undefined;
  [RootScreenID.Shared]: undefined;
};

export enum DrawerScreenID {
  Setting = 'DrawerScreen_Setting',
  Product = 'DrawerScreen_Product',
  Transaction = 'DrawerScreen_Transaction',
  Home = 'DrawerScreen_Home',
  InventoryControl = 'DrawerScreen_InventoryControl',
  Cancellation = 'DrawerScreen_Cancellation',
  Customer = 'DrawerScreen_Customer',
  Provider = 'DrawerScreen_Provider',
  Partner = 'DrawerScreen_Partner',
  Report = 'DrawerScreen_Report',
  CashBook = 'DrawerScreen_CashBook',
  Logout = 'DrawerScreen_Logout',
  EmployeeManagement = 'DrawerScreen_EmployeeManagement',
}
