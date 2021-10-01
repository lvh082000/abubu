import {RouteProp} from '@react-navigation/native';
import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {ReportScreenID, ReportStackParams} from 'navigation/ReportNavigation';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {HeaderReport} from '../components/HeaderReport';
import {UserItem} from '../components/UserItem';
import {ReportItem} from './components/ReportItem';

interface Props {
  route: RouteProp<ReportStackParams, ReportScreenID.SalesReport>;
}

const data = generateArray(10);

const SalesReport = ({route: {params}}: Props) => {
  const [isRevenue, setIsRevenue] = useState<boolean>(false);
  const [isProfit, setIsProfit] = useState<boolean>(false);
  const [isStatistical, setIsStatistical] = useState<boolean>(false);

  useEffect(() => {
    if (params?.title === 'doanh thu') {
      setIsRevenue(true);
    }
    if (params?.title === 'lợi nhuận gộp') {
      setIsProfit(true);
    }
    if (params?.title === 'thống kế ĐH') {
      setIsStatistical(true);
    }
  }, [params?.title]);

  const onRevenueItemPress = useCallback(() => {
    NavigationService.pushToScreen(ReportScreenID.SalesReportDetails, {
      title: 'doanh thu',
    });
  }, []);

  const onProfitItemPress = useCallback(() => {
    NavigationService.pushToScreen(ReportScreenID.SalesReportDetails, {
      title: 'lợi nhuận',
    });
  }, []);

  const renderRevenueItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ReportItem item={item} index={index} onItemPress={onRevenueItemPress} />
    );
  };

  const renderProfitItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ReportItem item={item} index={index} onItemPress={onProfitItemPress} />
    );
  };

  const renderUser = ({item, index}: {item: any; index: number}) => {
    return <UserItem item={item} index={index} onItemPress={() => {}} />;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Báo cáo ${params?.title}`}
      />

      <DateFilter />

      <HeaderReport
        isRevenue={isRevenue}
        isProfit={isProfit}
        isStatistical={isStatistical}
      />

      {isRevenue && (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderRevenueItem}
          keyExtractor={(_, index) => index.toString()}
          data={data}
        />
      )}

      {isProfit && (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderProfitItem}
          keyExtractor={(_, index) => index.toString()}
          data={data}
        />
      )}

      {isStatistical && (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderUser}
          keyExtractor={(_, index) => index.toString()}
          data={data}
        />
      )}
    </View>
  );
};

export default SalesReport;
