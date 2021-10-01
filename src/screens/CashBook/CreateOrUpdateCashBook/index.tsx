import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import {
  CashBookScreenID,
  CashBookStackParams,
} from 'navigation/CashBookNavigation';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CashBookService} from 'services/CashBookService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {
  CashBookReceiptType,
  CashBookType,
  CreateOrUpdateCashBookFormFormValues as FormValues,
} from 'types/Properties';
import Form from '../components/CreateOrUpdateCashBookForm';
import capitalize from 'lodash/capitalize';

interface Props {
  route: RouteProp<
    CashBookStackParams,
    CashBookScreenID.CreateOrUpdateCashBook
  >;
}

const CreateOrUpdateCashBook = ({route: {params}}: Props) => {
  const receiptNameType = useMemo(() => {
    const value = CashBookService.getReceiptNameType(params.receiptType);
    return capitalize(value);
  }, [params.receiptType]);
  const nameType = useMemo(() => {
    if (params.type === CashBookType.Bank) {
      return 'ngân hàng';
    }
    return 'tiền mặt';
  }, [params.type]);

  const initialValues: FormValues = useMemo(() => {
    return {
      outputType: '',
      receiverId: '',
      receiverName: '',
      receiverGroup: '',
      inputType: '',
      payerId: '',
      payerName: '',
      payerGroup: '',
      method: '',
      amount: '',
      name: '',
      account: '',
      description: '',
      transactionDate: new Date().getTime(),
    };
  }, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Lập ${receiptNameType} (${nameType})`}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Form
          initialValues={initialValues}
          isInput={params.receiptType === CashBookReceiptType.Input}
          isBank={params.type === CashBookType.Bank}
          onSubmit={() => {}}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateOrUpdateCashBook;
