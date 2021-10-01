import {SaleReportItem} from 'components/ListItems';
import Text from 'components/Text';
import {IconType} from 'components/VectorIcon';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {l, t} from 'styles/shared';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {ReportScreenID} from 'navigation/ReportNavigation';

export const SaleReportDetails = React.memo(() => {
  const navigationSalesReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.SalesReport,
      params: {
        title: 'doanh thu',
      },
    });
  }, []);

  const navigationProfitReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.SalesReport,
      params: {
        title: 'lợi nhuận gộp',
      },
    });
  }, []);

  const navigationStatisticReport = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Report, {
      screen: ReportScreenID.SalesReport,
      params: {
        title: 'thống kế ĐH',
      },
    });
  }, []);

  return (
    <View style={[l.mx20, l.mt30, l.mb30]}>
      <Text style={[t.h5, t.bold]}>Xem báo cáo chi tiết</Text>
      <SaleReportItem
        description="Hiển thị doanh thu của cửa hàng trong thời gian này"
        title="BÁO CÁO DOANH THU"
        iconName="bar-chart"
        iconType={IconType.ionIcon}
        onPress={navigationSalesReport}
      />
      <SaleReportItem
        description="Hiển thị lợi nhuận gộp từ hoạt động kinh doanh"
        title="BÁO CÁO LỢI NHUẬN GỘP"
        iconName="calculate"
        iconType={IconType.material}
        onPress={navigationProfitReport}
      />
      <SaleReportItem
        description="Hiển thị dự liệu tổng hợp về các đơn hàng"
        title="BÁO CÁO THỐNG KÊ ĐƠN HÀNG"
        iconName="list"
        iconType={IconType.ionIcon}
        onPress={navigationStatisticReport}
      />
    </View>
  );
});
