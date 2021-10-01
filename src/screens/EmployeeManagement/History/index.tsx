import NoDataView from 'components/NoDataView';
import React from 'react';
import {FlatList, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {
  EmployeeDetailType,
  TranType,
} from 'types/Responses/FetchGetEmployeeDetailsResponse';
import TransactionItem from './components/TransactionItem';

interface Props {
  employee: EmployeeDetailType;
}

const History = ({employee}: Props) => {
  const renderItem = ({item, index}: {item: TranType; index: number}) => {
    return <TransactionItem key={index} item={item} />;
  };

  const renderContent = () => {
    if (employee.trans.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        data={employee.trans}
      />
    );
  };

  return <View style={ContainerStyles}>{renderContent()}</View>;
};
export default History;
