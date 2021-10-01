import React from 'react';
import {FlatList, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import DebitGroupButtons from '../components/DebitGroupButtons';
import {DebitItem} from './components/DebitItem';
import {
  DebtDetailType,
  PartnerDetailsType,
} from 'types/Responses/FetchGetPartnerDetailsResponse';
import ListHeader from './components/ListHeader';
import NoDataView from 'components/NoDataView';

interface Props {
  partner: PartnerDetailsType;
}

const Debit = ({partner}: Props) => {
  const renderItem = ({item, index}: {item: DebtDetailType; index: number}) => {
    return <DebitItem type={partner.type} key={index} item={item} />;
  };

  const renderContent = () => {
    if (partner.transDetails.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          data={partner.debtDetails}
          ListHeaderComponent={
            <ListHeader
              numberOfItems={partner.debtDetails.length}
              total={partner.totalDebt}
            />
          }
        />

        <DebitGroupButtons />
      </>
    );
  };

  return <View style={ContainerStyles}>{renderContent()}</View>;
};

export default Debit;
