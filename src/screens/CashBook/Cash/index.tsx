import {DateFilter} from 'components/Filters';
import {VoucherItem} from 'components/ListItems';
import {PrimarySearchBar} from 'components/SearchBar';
import Constants from 'config/Constants';
import {CashBookScreenID} from 'navigation/CashBookNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {generateArray, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';
import {CashBookReceiptType, CashBookType} from 'types/Properties';
import {InputOrOutputButton} from '../components/InputOrOutputButton';

const data = generateArray(5);

const listRow = [
  {
    id: 1,
    title: 'Qũy đầu tư',
    total: 15000000,
    moneyColor: c.purple400,
  },
  {
    id: 2,
    title: 'Tổng thu',
    total: 15000000,
    moneyColor: c.blue400,
  },
  {
    id: 3,
    title: 'Tổng chi',
    total: 15000000,
    moneyColor: c.red800,
  },
  {
    id: 4,
    title: 'Tồn quỹ cuối kỳ',
    total: 15000000,
    moneyColor: c.green400,
  },
];

const styles = StyleSheet.create({
  row: {
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.py10,
    ...l.px20,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
  },
  textTotal: {
    ...l.pl20,
    ...l.py5,
    color: c.black200,
    fontFamily: t.fontFamily.Winston.Medium,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
  },
});

const Cash = () => {
  const handleNavigation = useCallback(receiptType => {
    NavigationService.pushToScreen(RootScreenID.CashBook, {
      screen: CashBookScreenID.CreateOrUpdateCashBook,
      params: {
        receiptType,
        type: CashBookType.Cash,
      },
    });
  }, []);

  const onSelectFilter = useCallback((string: number | string) => {}, []);

  const onItemPress = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.CashBook, {
      screen: CashBookScreenID.VoucherDetails,
    });
  }, []);

  return (
    <View style={ContainerStyles}>
      <PrimarySearchBar
        filterOptions={Constants.FilterOptions}
        onSelectFilter={onSelectFilter}
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <DateFilter />

        {listRow?.map(e => (
          <View key={e.id} style={styles.row}>
            <Text style={[t.bold, {color: c.black1000}]}>{e.title}</Text>
            <Text style={[t.bold, {color: e.moneyColor}]}>
              {toStringPrice(e.total)}
            </Text>
          </View>
        ))}

        <Text style={styles.textTotal}>Danh sách phiếu thu chi: 5</Text>
        {data?.map((item, index) => (
          <VoucherItem key={index} item={item} onItemPress={onItemPress} />
        ))}

        <View style={[l.flexRow, l.mt20, l.mb10]}>
          <InputOrOutputButton
            type={CashBookReceiptType.Input}
            onPress={handleNavigation}
          />
          <InputOrOutputButton
            type={CashBookReceiptType.Output}
            onPress={handleNavigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Cash;
