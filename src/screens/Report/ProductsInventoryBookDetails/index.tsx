import {RouteProp} from '@react-navigation/native';
import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {ReportScreenID, ReportStackParams} from 'navigation/ReportNavigation';
import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {DebtItem} from '../components/DebtItem';
import {InventoryBookItem} from '../components/InventoryBookItem';

const data = generateArray(5);

interface Props {
  route: RouteProp<
    ReportStackParams,
    ReportScreenID.ProductsInventoryBookDetails
  >;
}

const ProductsInventoryBookDetails = ({route: {params}}: Props) => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <InventoryBookItem item={item} index={index} onItemPress={() => {}} />
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Giá trị ${params.title} kho`}
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

export default ProductsInventoryBookDetails;
