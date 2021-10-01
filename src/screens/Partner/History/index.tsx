import NoDataView from 'components/NoDataView';
import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l, c, t} from 'styles/shared';
import {
  PartnerDetailsType,
  TransDetailType,
} from 'types/Responses/FetchGetPartnerDetailsResponse';
import HistoryItem from './components/HistoryItem';
import ListHeader from './components/ListHeader';

interface Props {
  partner: PartnerDetailsType;
}

const History = ({partner}: Props) => {
  const getItemLayout = useCallback(
    (_, index) => ({
      length: 57,
      offset: 57 * index,
      index,
    }),
    [],
  );
  const renderItem = ({
    item,
    index,
  }: {
    item: TransDetailType;
    index: number;
  }) => {
    return <HistoryItem key={index} item={item} />;
  };

  const renderContent = () => {
    if (partner.transDetails.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <FlatList
        initialNumToRender={30}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={partner.transDetails}
        ListHeaderComponent={
          <ListHeader
            numberOfItems={partner.transDetails.length}
            totalTrans={partner.totalTrans}
            type={partner.type}
            totalRefund={partner.totalRefund}
          />
        }
        getItemLayout={getItemLayout}
      />
    );
  };

  return <View style={ContainerStyles}>{renderContent()}</View>;
};
export default History;
