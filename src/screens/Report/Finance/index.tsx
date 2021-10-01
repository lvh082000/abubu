import Button from 'components/Button';
import {DateFilter} from 'components/Filters';
import React, {Suspense, useCallback, useState} from 'react';
import {lazily} from 'react-lazily';
import {ScrollView, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {FinanceReportDetails} from './components/FinanceReportDetails';

const {Funds} = lazily(() => import('./components/Funds'));
const {MyBarChart} = lazily(() => import('components/Charts/MyBarChart'));

const ReportFinance = () => {
  const [isShowRevenueChart, setChartVisible] = useState(true);

  const onChartChange = useCallback(() => {
    setChartVisible(!isShowRevenueChart);
  }, [isShowRevenueChart]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ContainerStyles}>
      <DateFilter />
      <Suspense fallback={null}>
        {isShowRevenueChart && (
          <MyBarChart description="Lợi nhuận ròng = Doanh thu thuần – Giá vốn – Chi phí bán hàng" />
        )}
        {!isShowRevenueChart && <Funds />}
        <View style={[l.mx20, l.mt10, l.mt30]}>
          <Button
            onPress={onChartChange}
            size="lg"
            variant="primary"
            title={isShowRevenueChart ? 'LỢI NHUẬN' : 'DOANH THU'}
          />
        </View>
        <FinanceReportDetails />
      </Suspense>
    </ScrollView>
  );
};
export default ReportFinance;
