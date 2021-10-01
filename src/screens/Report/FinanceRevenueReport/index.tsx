import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {Header} from './components/Header';
import {RevenueReport} from './components/RevenueReport';

const FinanceRevenueReport = () => {
  return (
    <View style={[ContainerStyles]}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Báo cáo lãi lỗ"
      />

      <DateFilter />

      <Header />

      <RevenueReport />
    </View>
  );
};

export default FinanceRevenueReport;
