import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {ReportScreenID} from 'navigation/ReportNavigation';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';
import {DebtItem} from '../components/DebtItem';

const FinanceDebtReport = () => {
  const navigationCollect = useCallback(() => {
    NavigationService.pushToScreen(ReportScreenID.FinanceDebtReportDetails, {
      title: 'thu',
    });
  }, []);

  const navigationPay = useCallback(() => {
    NavigationService.pushToScreen(ReportScreenID.FinanceDebtReportDetails, {
      title: 'trả',
    });
  }, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Công nợ phải thu phải trả"
      />

      <DateFilter />

      <DebtItem type="thu" onPress={navigationCollect} />

      <DebtItem type="trả" onPress={navigationPay} />
    </View>
  );
};

export default FinanceDebtReport;
