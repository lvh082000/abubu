import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {ReportScreenID} from 'navigation/ReportNavigation';
import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {DebtItem} from '../components/DebtItem';
import {InventoryBookItem} from '../components/InventoryBookItem';

const data = generateArray(10);

const ProductsInventoryBook = () => {
  const navigationImport = useCallback(() => {
    NavigationService.pushToScreen(
      ReportScreenID.ProductsInventoryBookDetails,
      {
        title: 'nhập',
      },
    );
  }, []);

  const navigationExport = useCallback(() => {
    NavigationService.pushToScreen(
      ReportScreenID.ProductsInventoryBookDetails,
      {
        title: 'xuất',
      },
    );
  }, []);

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
        title="Báo cáo sổ kho"
      />

      <DateFilter />

      <DebtItem type="nhập" onPress={navigationImport} />

      <DebtItem type="xuất" onPress={navigationExport} />

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

export default ProductsInventoryBook;
