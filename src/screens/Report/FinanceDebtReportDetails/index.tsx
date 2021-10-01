import {RouteProp} from '@react-navigation/native';
import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {UserItem} from 'components/ListItems';
import {ReportScreenID, ReportStackParams} from 'navigation/ReportNavigation';
import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c} from 'styles/shared';
import {DebtItem} from '../components/DebtItem';

const data = generateArray(5);

interface Props {
  route: RouteProp<ReportStackParams, ReportScreenID.FinanceDebtReportDetails>;
}

const FinanceDebtReportDetails = ({route: {params}}: Props) => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <UserItem
        item={item}
        index={index}
        widgetStyles={{
          moneyText: {color: params?.title === 'thu' ? c.blue500 : c.red800},
        }}
      />
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Phải ${params?.title}`}
      />

      <DateFilter />

      <DebtItem type={params?.title} />

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={data}
      />
    </View>
  );
};

export default FinanceDebtReportDetails;
