import {SaleReportItem} from 'components/ListItems';
import Text from 'components/Text';
import {IconType} from 'components/VectorIcon';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {l, t} from 'styles/shared';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {ReportScreenID} from 'navigation/ReportNavigation';

export const FinanceReportDetails = React.memo(() => {
  const navigationFinanceRevenueReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.FinanceRevenueReport,
    });
  }, []);

  const navigationFinanceCashBook = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.FinanceCashBook,
    });
  }, []);

  const navigationFinanceDebtReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.FinanceDebtReport,
    });
  }, []);
  return (
    <View style={[l.mx20, l.mt30, l.mb30]}>
      <Text style={[t.h5, t.bold]}>Xem báo cáo chi tiết</Text>
      <SaleReportItem
        description="Hiển thị doanh thu, chi phí và lãi lỗ của cửa hàng trong kỳ"
        title="BÁO CÁO LÃI LỖ"
        iconName="money"
        iconType={IconType.fontAwesome}
        onPress={navigationFinanceRevenueReport}
      />
      <SaleReportItem
        description="Quản lý dòng tiền thu vào, chi ra của cửa hàng"
        title="SỔ QUỸ"
        iconName="calculate"
        iconType={IconType.material}
        onPress={navigationFinanceCashBook}
      />
      <SaleReportItem
        description="Quản lý công nợ phải thu hoặc phải trả khách hàng và nhà cung cấp, đối tác"
        title="BÁO CÁO CÔNG NỢ PHẢI THU, PHẢI TRẢ"
        iconName="list"
        iconType={IconType.ionIcon}
        onPress={navigationFinanceDebtReport}
      />
    </View>
  );
});
