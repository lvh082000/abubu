import {SaleReportItem} from 'components/ListItems';
import Text from 'components/Text';
import {IconType} from 'components/VectorIcon';
import {ReportScreenID} from 'navigation/ReportNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {l, t} from 'styles/shared';

export const ProductReportDetails = React.memo(() => {
  const navigationInventoryReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.ProductsInventoryReport,
    });
  }, []);

  const navigationInventoryBook = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.ProductsInventoryBook,
    });
  }, []);

  const navigationExportImportReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.ProductsExportImportReport,
    });
  }, []);

  return (
    <View style={[l.mx20, l.mt30, l.mb30]}>
      <Text style={[t.h5, t.bold]}>Xem báo cáo chi tiết</Text>

      <SaleReportItem
        description="Báo cáo giá trị và số lượng hàng hóa trong kho"
        title="BÁO CÁO TỒN KHO"
        iconName="inventory"
        iconType={IconType.material}
        onPress={navigationInventoryReport}
      />
      <SaleReportItem
        description="Quản lý xuất kho, nhập kho"
        title="SỔ KHO"
        iconName="calculate"
        iconType={IconType.material}
        onPress={navigationInventoryBook}
      />
      <SaleReportItem
        description="Quản lý xuất kho, nhập kho. Tồn kho theo từng sản phẩm"
        title="BÁO CÁO XUẤT NHẬP TỒN"
        iconName="list"
        iconType={IconType.ionIcon}
        onPress={navigationExportImportReport}
      />
    </View>
  );
});
