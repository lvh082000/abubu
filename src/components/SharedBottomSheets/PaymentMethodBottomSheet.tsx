import {useBottomSheet} from 'components/BottomSheet';
import Text from 'components/Text';
import {PaymentScreenID} from 'navigation/PaymentNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import NavigationService from 'services/NavigationService';
import {l, c, t} from 'styles/shared';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationNext} from 'components/SharedIcons';
import {RadioOption} from 'components/FormControls';
import {BankAccountItem, PaymentMethodType} from 'types/Properties';
import {useAppSelector} from 'hooks/useRedux';
import {BankAccountsSelector} from 'store/Order';
import {getBankAccountId} from 'services/UtilService';

export type PaymentMethodSelectedData = {
  type: PaymentMethodType;
  value?: string | undefined;
};

interface PaymentMethodBottomSheetProps {
  value: string | undefined;
  useCod?: boolean;
  usePaidLater?: boolean;
  onSelect: (data: PaymentMethodSelectedData) => void;
}

interface ItemProps {
  title: string;
  description: string;
  onPress: () => void;
  onNavigate: () => void;
}

const getValueString = (
  type: PaymentMethodType,
  index: number,
  options: Array<BankAccountItem>,
) => {
  const {account, name, bank} = options[index];
  const value = `${account}-${name}-${bank}`;
  if (type === 'bank') {
    return `STK-${value}`;
  }
  return `ST-${value}`;
};

const Item = React.memo(
  ({onNavigate, onPress, title, description}: ItemProps) => {
    return (
      <View style={[l.py15, l.alignCtr, l.justifyBtw, l.flexRow]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <Text style={[t.h5LG, t.bold]}>{title}</Text>
          <Text style={[t.pSM, l.mt5, {color: c.green800}]}>{description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNavigate}
          activeOpacity={0.7}
          style={[l.pl10, l.py5]}>
          <NavigationNext size={20} color={c.green800} />
        </TouchableOpacity>
      </View>
    );
  },
);

export const PaymentMethodBottomSheet = React.memo(
  ({
    value,
    useCod = false,
    usePaidLater = false,
    onSelect,
  }: PaymentMethodBottomSheetProps) => {
    const {bottom} = useSafeAreaInsets();
    const {dismissBottomSheet} = useBottomSheet();
    const bankAccounts = useAppSelector(BankAccountsSelector());

    const cards = useMemo(() => {
      return bankAccounts.filter(v => v.type === 'card');
    }, [bankAccounts]);

    const banks = useMemo(() => {
      return bankAccounts.filter(v => v.type === 'bank');
    }, [bankAccounts]);

    const cardOptions = useMemo(() => {
      return cards.map(v => {
        return {
          value: v.id,
          title: `STK: ${v.account}
Tên tài khoản: ${v.name}
Ngân hàng: ${v.bank}`,
        };
      });
    }, [cards]);

    const bankOptions = useMemo(() => {
      return banks.map(v => {
        return {
          value: v.id,
          title: `STK: ${v.account}
Tên tài khoản: ${v.name}
Ngân hàng: ${v.bank}`,
        };
      });
    }, [banks]);

    const selectedIndex = useMemo(() => {
      const accountId = getBankAccountId(value);

      let index = 0;
      index = bankOptions.findIndex(
        v => accountId && v.title.includes(accountId),
      );
      if (index >= 0) {
        return index;
      }
      if (index < 0) {
        index = cardOptions.findIndex(
          v => accountId && v.title.includes(accountId),
        );
      }
      return index >= 0 ? index : 0;
    }, [value, bankAccounts, cardOptions]);

    const close = useCallback(
      (type?: PaymentMethodType | undefined) => {
        dismissBottomSheet();

        switch (type) {
          case 'cash': {
            onSelect({
              type,
              value: type,
            });
            break;
          }
          case 'bank':
          case 'card': {
            const options = type === 'bank' ? banks : cards;
            const value = getValueString(type, selectedIndex, options);
            onSelect({type, value});
            break;
          }
          case 'cod':
          case 'paidlater':
            onSelect({type, value: type});
            break;
          default:
            break;
        }
      },
      [onSelect, selectedIndex],
    );

    const onResult = (option: RadioOption, type: PaymentMethodType) => {
      const radioOptions = type === 'bank' ? bankOptions : cardOptions;
      const accoutOptions = type === 'bank' ? banks : cards;
      const index = radioOptions.findIndex(v => v.title.includes(option.title));
      const value = getValueString(type, index, accoutOptions);
      onSelect({type, value});
    };

    const onAdd = useCallback(
      (type: PaymentMethodType) => {
        dismissBottomSheet();
        setTimeout(() => {
          NavigationService.pushToScreen(RootScreenID.Payment, {
            screen: PaymentScreenID.SelectPaymentAccount,
            params: {
              initialIndex: selectedIndex,
              options: type === 'bank' ? bankOptions : cardOptions,
              onResult: (option: RadioOption) => onResult(option, type),
              type: type,
            },
          });
        });
      },
      [value, selectedIndex, bankOptions, cardOptions],
    );

    return (
      <View style={[l.px20, {paddingBottom: bottom}]}>
        {usePaidLater && (
          <TouchableOpacity
            onPress={() => close('paidlater')}
            activeOpacity={0.7}
            style={[l.py15]}>
            <Text style={[t.h5LG, t.bold, {color: c.red800}]}>
              Thanh toán sau (tính công nợ)
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => close('cash')}
          activeOpacity={0.7}
          style={[l.py15]}>
          <Text style={[t.h5LG, t.bold]}>Tiền mặt</Text>
        </TouchableOpacity>
        {useCod && (
          <TouchableOpacity
            onPress={() => close('cod')}
            activeOpacity={0.7}
            style={[l.py15]}>
            <Text style={[t.h5LG, t.bold]}>COD</Text>
          </TouchableOpacity>
        )}
        <Item
          title="Chuyển khoản"
          description={bankOptions[selectedIndex].title}
          onNavigate={() => onAdd('bank')}
          onPress={() => close('bank')}
        />
        <Item
          title="Quẹt Thẻ"
          description={cardOptions[selectedIndex].title}
          onNavigate={() => onAdd('card')}
          onPress={() => close('card')}
        />
        <TouchableOpacity
          onPress={() => close()}
          activeOpacity={0.7}
          style={[l.py15]}>
          <Text style={[t.h5LG, t.bold, {color: c.blue600}]}>Đóng</Text>
        </TouchableOpacity>
      </View>
    );
  },
);
