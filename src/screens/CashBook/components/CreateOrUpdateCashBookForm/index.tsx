import {CurrencyInput, Input, YupExtended} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {
  SelectAccount,
  SelectCard,
  SelectGroup,
  SelectPeople,
  SelectTime,
  SelectType,
} from './InputControls';
import {SelectPartnersProvider} from 'components/SelectPartners';
import {CreateOrUpdateCashBookFormFormValues as FormValues} from 'types/Properties';

interface FormControlsProps {
  isInput: boolean;
  isBank: boolean;
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
}

const CreateOrUpdateCashBookForm = ({
  isInput,
  isBank,
  initialValues,
  onSubmit,
}: FormControlsProps) => {
  const validationSchema = useMemo(() => {
    const commonValidationSchema = {
      amount: YupExtended.string().required('Vui lòng nhập số tiền').currency(),
    };
    const bankValidationSchema = {
      account: YupExtended.string().required('Vui lòng chọn tài khoản'),
    };
    if (isInput) {
      const inputValidationSchema = {
        inputType: YupExtended.string().required('Vui lòng nhập loại thu'),
        payerName: YupExtended.string().required('Vui lòng nhập người nộp'),
        payerGroup: YupExtended.string().required('Vui lòng chọn nhóm nộp'),
      };
      if (isBank) {
        return YupExtended.object().shape({
          ...commonValidationSchema,
          ...bankValidationSchema,
          ...inputValidationSchema,
        });
      }
      return YupExtended.object().shape({
        ...commonValidationSchema,
        ...inputValidationSchema,
      });
    }
    const outputValidationSchema = {
      outputType: YupExtended.string().required('Vui lòng nhập loại chi'),
      receiverName: YupExtended.string().required('Vui lòng nhập người nhận'),
      receiverGroup: YupExtended.string().required('Vui lòng chọn nhóm nhận'),
    };
    if (isBank) {
      return YupExtended.object().shape({
        ...commonValidationSchema,
        ...bankValidationSchema,
        ...outputValidationSchema,
      });
    }
    return YupExtended.object().shape({
      ...commonValidationSchema,
      ...outputValidationSchema,
    });
  }, [isInput, isBank]);
  return (
    <SelectPartnersProvider>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={[l.flex, l.mx20, l.mt20]}>
              <SelectType isInput={isInput} />

              <SelectGroup isInput={isInput} />

              <SelectPeople isInput={isInput} />

              <CurrencyInput
                onChangeText={handleChange('amount')}
                value={values.amount}
                hint={'Số tiền'}
                label={'Nhập số tiền'}
                touched={touched.amount}
                error={errors.amount}
              />

              {isBank && <SelectCard />}

              {isBank && <SelectAccount isInput={isInput} />}
              <SelectTime />

              <Input
                onChangeText={handleChange('description')}
                value={values.description}
                hint={'Nhập ghi chú'}
                label={'Ghi chú'}
                touched={touched.description}
                error={errors.description}
              />

              <GradientButton
                widgetStyles={{container: [l.mb30, l.mt20]}}
                onPress={handleSubmit}
                title="LƯU"
              />
            </View>
          );
        }}
      </Formik>
    </SelectPartnersProvider>
  );
};

export default React.memo(CreateOrUpdateCashBookForm);
