import Button from 'components/Button';
import {DateFilter} from 'components/Filters';
import React, {Suspense, useCallback, useState} from 'react';
import {lazily} from 'react-lazily';
import {ScrollView, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {SaleReportDetails} from './components/SaleReportDetails';

const {MyLinesChart} = lazily(() => import('components/Charts/MyLinesChart'));
const {MyBarChart} = lazily(() => import('components/Charts/MyBarChart'));

const ReportSale = () => {
  const [isShowRevenueChart, setChartVisible] = useState(true);

  const onChartChange = useCallback(() => {
    setChartVisible(!isShowRevenueChart);
  }, [isShowRevenueChart]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ContainerStyles}>
      <DateFilter />
      <Suspense fallback={null}>
        {isShowRevenueChart && (
          <MyBarChart description="Doanh thu bằng tổng các đơn hàng đã giao thành công, đã trừ trả hàng" />
        )}
        {!isShowRevenueChart && <MyLinesChart />}
        <View style={[l.mx20, l.mt10, l.mt30]}>
          <Button
            onPress={onChartChange}
            size="lg"
            variant="primary"
            title={isShowRevenueChart ? 'LỢI NHUẬN' : 'DOANH THU'}
          />
        </View>
        <SaleReportDetails />
      </Suspense>
    </ScrollView>
  );
};
export default ReportSale;
