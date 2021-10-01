import {SelectWithNavigation} from 'components/CustomInputs';
import {DateTimePicker, Input, Select} from 'components/FormControls';
import {useFormikContext} from 'formik';
import {useBottomAction} from 'hooks/useBottomAction';
import {useAppSelector} from 'hooks/useRedux';
import {SharedScreenID} from 'navigation/SharedNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useEffect, useState} from 'react';
import NavigationService from 'services/NavigationService';
import {ReceiptTypesSelector} from 'store/CashBook';
import {
  CashBookGroupType,
  SelectSharedItemType,
  SelectSharedPersonType,
} from 'types/Properties';
import {PersonItemType} from 'types/Responses/FetchGetPersonResponseType';
import {CreateOrUpdateCashBookFormFormValues as FormValues} from 'types/Properties';

const GroupOptions = ['Khách hàng', 'Nhà cung cấp', 'Nhân viên', 'Khác'];

interface ResultCallback {
  result: PersonItemType | undefined;
}

export const SelectType = React.memo(({isInput}: {isInput: boolean}) => {
  const data = useAppSelector(ReceiptTypesSelector());
  return (
    <SelectWithNavigation
      hint={isInput ? 'Chọn loại thu' : 'Chọn loại chi'}
      label={isInput ? 'Loại thu' : 'Loại chi'}
      items={data}
      field={isInput ? 'inputType' : 'outputType'}
      type={
        isInput
          ? SelectSharedItemType.InputReceipt
          : SelectSharedItemType.OutputReceipt
      }
    />
  );
});

export const SelectGroup = React.memo(({isInput}: {isInput: boolean}) => {
  const {values, errors, touched, setFieldValue} =
    useFormikContext<FormValues>();
  const [displayText, setDisplayText] = useState('');
  const {showBottomActions} = useBottomAction();
  const fieldGroup = isInput ? 'payerGroup' : 'receiverGroup';
  const fieldName = isInput ? 'payerName' : 'receiverName';
  const fieldId = isInput ? 'payerId' : 'receiverId';
  const currentValue = values[fieldGroup];

  const handleChangeValue = (type: CashBookGroupType, text: string) => {
    if (type === currentValue) {
      return;
    }
    setFieldValue(fieldGroup, type);
    setFieldValue(fieldName, '');
    setFieldValue(fieldId, 0);
    setDisplayText(text);
  };

  const onSelectPress = useCallback(() => {
    showBottomActions({options: GroupOptions}, (index: number) => {
      switch (index) {
        case 0:
          handleChangeValue(CashBookGroupType.Guest, 'Nhóm khách hàng');
          break;
        case 1:
          handleChangeValue(CashBookGroupType.Provider, 'Nhóm nhà cung cấp');
          break;
        case 2:
          handleChangeValue(CashBookGroupType.Personnel, 'Nhóm nhân viên');
          break;
        case 3:
          handleChangeValue(CashBookGroupType.Other, 'Nhóm khác');
          break;
      }
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <Select
      value={displayText}
      label={isInput ? 'Nhóm nộp' : 'Nhóm nhận'}
      hint={isInput ? 'Chọn nhóm nộp' : 'Chọn nhóm nhận'}
      touched={touched[fieldGroup]}
      error={errors[fieldGroup]}
      onSelectPress={onSelectPress}
    />
  );
});

export const SelectPeople = React.memo(({isInput}: {isInput: boolean}) => {
  const {values, errors, touched, setFieldValue} =
    useFormikContext<FormValues>();
  const [displayText, setDisplayText] = useState('');
  const groupFieldName = isInput ? 'payerGroup' : 'receiverGroup';
  const groupValue = values[groupFieldName];
  const fieldName = isInput ? 'payerName' : 'receiverName';
  const fieldId = isInput ? 'payerId' : 'receiverId';
  const currentValue = values[fieldName];

  const onSelected = (data: ResultCallback) => {
    setTimeout(() => {
      if (data.result) {
        setFieldValue(fieldName, data.result.id, true);
        setDisplayText(data.result.name);
      } else {
        setFieldValue(fieldName, '', true);
        setDisplayText('');
      }
    });
  };

  const onSelectPress = useCallback(() => {
    const value = values[groupFieldName];
    let type = undefined;
    switch (value) {
      case CashBookGroupType.Provider:
        type = SelectSharedPersonType.Provider;
        break;
      case CashBookGroupType.Guest:
        type = SelectSharedPersonType.Customer;
        break;
      case CashBookGroupType.Guest:
        type = SelectSharedPersonType.Employee;
        break;
    }
    if (type) {
      NavigationService.forcePushScreen(RootScreenID.Shared, {
        screen: SharedScreenID.SelectPerson,
        params: {
          type: type,
          resultCallback: onSelected,
        },
      });
    } else {
    }
  }, [groupValue]);

  const onChangeText = useCallback(
    (text: string) => {
      setFieldValue(fieldName, text, true);
      if (!!values[fieldId]) {
        setFieldValue(fieldId, '');
      }
    },
    [values[fieldId]],
  );

  useEffect(() => {
    if (!currentValue) {
      setDisplayText('');
    }
  }, [currentValue]);

  const commonProps = {
    label: isInput ? 'Người nộp' : 'Người nhận',
    hint: isInput ? 'Chọn người nộp' : 'Chọn người nhận',
    touched: touched[fieldName],
    error: errors[fieldName],
  };

  if (groupValue === CashBookGroupType.Other) {
    return <Input {...commonProps} onChangeText={onChangeText} />;
  }

  return (
    <Select
      {...commonProps}
      value={displayText}
      onSelectPress={onSelectPress}
    />
  );
});

export const SelectCard = React.memo(() => {
  const {values, errors, touched} = useFormikContext<FormValues>();

  return (
    <Select
      value={values.method}
      label={'Phương thức'}
      hint="Thẻ"
      touched={touched.method}
      error={errors.method}
      onSelectPress={() => {}}
    />
  );
});

export const SelectAccount = React.memo(({isInput}: {isInput: boolean}) => {
  const {values, errors, touched} = useFormikContext<FormValues>();

  return (
    <Select
      value={values.account}
      label={isInput ? 'TK nhận' : 'TK chi'}
      hint={isInput ? 'Chọn tài khoản nhận' : 'Chọn tài khoản chi'}
      touched={touched.account}
      error={errors.account}
      onSelectPress={() => {}}
    />
  );
});

export const SelectTime = React.memo(() => {
  const {values, setFieldValue} = useFormikContext<FormValues>();

  const onValueChange = useCallback((value: number) => {
    setFieldValue('transactionDate', value);
  }, []);

  return (
    <DateTimePicker
      value={values.transactionDate}
      mode="datetime"
      hint="Chọn thời gian"
      label={'Thời gian'}
      onValueChange={onValueChange}
    />
  );
});
