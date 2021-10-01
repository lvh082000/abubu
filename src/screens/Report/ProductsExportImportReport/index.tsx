import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {HeaderReport} from '../components/HeaderReport';
import {ExImportItem} from './components/ExImportItem';

const data = generateArray(10);

const ProductsExportImportReport = () => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <ExImportItem item={item} />;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Báo cáo xuất nhập tồn"
      />
      <DateFilter />
      <HeaderReport isExportImport={true} />

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

export default ProductsExportImportReport;
