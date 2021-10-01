import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {ProductItem} from 'components/ListItems';
import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {ProductItemType} from 'types/Responses/FetchGetProductsResponse';
import {HeaderReport} from '../components/HeaderReport';

const data = [
  {
    id: 1,
    cuahang_id: 1,
    ma: 'SP00001',
    ten: 'Dầu gội',
    nhom: 1,
    thuonghieu: 'abc',
    giaban: '1000000',
    giavon: '2000000',
    tonkho: 10,
    trangthai: 1,
    created_at: '04/09/2021   16:57',
    updated_at: '04/09/2021   16:57',
  },
  {
    id: 1,
    cuahang_id: 1,
    ma: 'SP00001',
    ten: 'Dầu gội',
    nhom: 1,
    thuonghieu: 'abc',
    giaban: '1000000',
    giavon: '2000000',
    tonkho: 10,
    trangthai: 1,
    created_at: '04/09/2021   16:57',
    updated_at: '04/09/2021   16:57',
  },
  {
    id: 1,
    cuahang_id: 1,
    ma: 'SP00001',
    ten: 'Dầu gội',
    nhom: 1,
    thuonghieu: 'abc',
    giaban: '1000000',
    giavon: '2000000',
    tonkho: 10,
    trangthai: 1,
    created_at: '04/09/2021   16:57',
    updated_at: '04/09/2021   16:57',
  },
];

const ProductsInventoryReport = () => {
  const onItemPress = useCallback((value: ProductItemType) => {}, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItemType;
    index: number;
  }) => {
    return <ProductItem onItemPress={onItemPress} item={item} index={index} />;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Báo cáo tồn kho"
      />

      <DateFilter />

      <HeaderReport isInventory={true} />

      <FlatList
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={data as any}
      />
    </View>
  );
};

export default ProductsInventoryReport;
