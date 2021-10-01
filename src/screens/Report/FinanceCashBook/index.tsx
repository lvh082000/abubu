import {DateFilter} from 'components/Filters';
import {GradientHeader} from 'components/Header';
import {VoucherItem} from 'components/ListItems';
import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {Header} from './components/Header';
import ListHeader from './components/ListHeader';

const data = generateArray(10);

const FinanceCashBook = () => {
  const renderItem = ({item}: {item: any}) => {
    return <VoucherItem item={item} />;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Báo cáo sổ quỹ"
      />

      <DateFilter />

      <Header />

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

export default FinanceCashBook;
