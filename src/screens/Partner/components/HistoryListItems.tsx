import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l, c, t} from 'styles/shared';

const data = generateArray(2);

const ListHeader = React.memo(() => {
  return (
    <View
      style={[
        {borderBottomColor: c.green800, borderBottomWidth: 1},
        l.justifyBtw,
        l.flexRow,
      ]}>
      <Text style={[l.mx20, l.my10]}>2 giao dịch</Text>
      <Text style={[l.mx20, l.my10]}>Tổng mua: 2000000</Text>
    </View>
  );
});

const HistoryItem = React.memo(() => {
  return (
    <ContainerItem>
      <View>
        <Text>DHTT000001</Text>
        <Text style={[t.bold, {color: c.green800}]}>23/02/2021 12:11</Text>
      </View>
      <View style={[l.flexCenter]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(1000000)}
        </Text>
      </View>
    </ContainerItem>
  );
});

const HistoryListItems = () => {
  const renderItem = () => {
    return <HistoryItem />;
  };

  return (
    <View style={ContainerStyles}>
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
export default HistoryListItems;
