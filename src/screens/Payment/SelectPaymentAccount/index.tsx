import {RouteProp} from '@react-navigation/native';
import AddButton from 'components/AddButton';
import {GradientHeader} from 'components/Header';
import ListSelectedOptions from 'components/ListSelectedOptions';
import {
  PaymentScreenID,
  PaymentStackParams,
} from 'navigation/PaymentNavigation';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';

interface Props {
  route: RouteProp<PaymentStackParams, PaymentScreenID.SelectPaymentAccount>;
}

const SelectPaymentAccount = ({route: {params}}: Props) => {
  const navigationAddAccount = useCallback(() => {
    NavigationService.pushToScreen(PaymentScreenID.AddPaymentAccount, {
      type: params.type,
    });
  }, []);

  const onChangeValue = useCallback(
    value => {
      NavigationService.goBack();
      if (params.onResult) {
        params.onResult(value);
      }
    },
    [params.onResult],
  );

  const initialValue = useMemo(() => {
    if (typeof params.initialIndex === 'number' && params.initialIndex >= 0) {
      return params.options[params.initialIndex].value;
    }
    return undefined;
  }, [params.options, params.initialIndex]);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Chọn tài khoản"
      />
      <ListSelectedOptions
        onChangeValue={onChangeValue}
        options={params.options}
        initialValue={initialValue}
      />
      <AddButton onPress={navigationAddAccount} />
    </View>
  );
};

export default SelectPaymentAccount;
