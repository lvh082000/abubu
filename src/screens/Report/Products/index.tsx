import {DateFilter} from 'components/Filters';
import React from 'react';
import {ScrollView} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {Inventory} from './components/Inventory';
import {ProductReportDetails} from './components/ProductReportDetails';

const ReportProducts = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={ContainerStyles}>
      <DateFilter />
      <Inventory />
      <ProductReportDetails />
    </ScrollView>
  );
};
export default ReportProducts;
