import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import DebitGroupButtons from '../components/DebitGroupButtons';
import {l, c, t} from 'styles/shared';
import Text from 'components/Text';
import {ContainerItem} from 'components/ListItems';

const data = generateArray(3);

const ListHeader = React.memo(() => {
  return (
    <View
      style={[
        {borderBottomColor: c.green800, borderBottomWidth: 1},
        l.justifyBtw,
        l.flexRow,
      ]}>
      <Text style={[l.mx20, l.my10]}>3 bản ghi</Text>
      <Text style={[l.mx20, l.my10]}>
        Nợ cần trả:{' '}
        <Text style={[{color: c.red800}, t.bold, t.h5LG]}>
          {toStringPrice(500000)}
        </Text>
      </Text>
    </View>
  );
});

const DebitItem = React.memo(() => {
  return (
    <ContainerItem>
      <View>
        <Text>DHTT000001</Text>
        <Text style={[t.bold, {color: c.green800}]}>23/02/2021 12:11</Text>
      </View>
      <View style={[l.flexCenter]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>Trả hàng</Text>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(1000000)}
        </Text>
        <Text>Nợ còn: {toStringPrice(1000000)}</Text>
      </View>
    </ContainerItem>
  );
});

export const DebitListItems = React.memo(() => {
  const renderItem = () => {
    return <DebitItem />;
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

      <DebitGroupButtons />
    </View>
  );
});
