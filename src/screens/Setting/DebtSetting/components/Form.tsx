import Button from 'components/Button';
import {Input} from 'components/FormControls';
import {Formik, useFormikContext} from 'formik';
import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import {c, l} from 'styles/shared';
import * as Yup from 'yup';
import styles from '../styles';
import {QuestionIcon} from 'components/SharedIcons';
import {ToggleSwitch} from 'components/FormControls';

interface FormValues {
  currentDebt?: string;
  numerOfDays?: string;
  debtLevel?: string;
  enableCurrentDebt: boolean;
  enableNumberOfDays: boolean;
  enableDebtLevel: boolean;
}

const currentDebtValidation = Yup.string().required('Vui lòng nhập số tiền');
const numerOfDaysValidation = Yup.string().required('Vui lòng nhập số tiền');
const debtLevelValidation = Yup.string().required('Vui lòng nhập số tiền');

const initialValues: FormValues = {
  currentDebt: '',
  numerOfDays: '',
  debtLevel: '',
  enableCurrentDebt: false,
  enableNumberOfDays: false,
  enableDebtLevel: false,
};

interface FormControlsProps {
  onFormSubmit?: () => void;
}

const ToggleInput = ({title, field}: {title: string; field: string}) => {
  const {setFieldValue, values} = useFormikContext<FormValues>();

  const handleChange = (value: boolean) => {
    if (!value) {
      Keyboard.dismiss();
    }

    setFieldValue(field, value);
  };

  return (
    <View style={styles.rowItem}>
      <View style={{...l.flexRow, width: '70%'}}>
        <Text style={styles.textTitle}>{title}</Text>
        <QuestionIcon color={c.green800} size={20} />
      </View>
      <ToggleSwitch
        handleOnPress={handleChange}
        //@ts-ignore
        value={values[field]}
      />
    </View>
  );
};

const DebtSettingForm = React.memo(({onFormSubmit}: FormControlsProps) => {
  const onSubmit = () => {
    //   onFormSubmit?.(values);
  };

  const validationSchema = () => {
    return Yup.lazy((values: FormValues) => {
      let schema = {};
      if (values.enableCurrentDebt) {
        schema = {
          ...schema,
          currentDebt: currentDebtValidation,
        };
      }
      if (values.enableNumberOfDays) {
        schema = {
          ...schema,
          numerOfDays: numerOfDaysValidation,
        };
      }
      if (values.enableDebtLevel) {
        schema = {
          ...schema,
          debtLevel: debtLevelValidation,
        };
      }
      return Yup.object().shape(schema);
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <View style={styles.debtSettingContainer}>
            <Text style={styles.textWarning}>
              Cài đặt cảnh bảo công nợ khách hàng
            </Text>
            <View style={styles.itemContainer}>
              <ToggleInput title="Nợ hiện tại" field="enableCurrentDebt" />
              <Input
                touched={touched.currentDebt}
                error={errors.currentDebt}
                onChangeText={handleChange('currentDebt')}
                value={values.currentDebt}
                hint={'Nhập số tiền'}
                label={'Số tiền'}
                hintTextColor={c.black1000}
                focusedColor={c.black1000}
                borderColor={c.black1000}
                editable={values.enableCurrentDebt}
              />
            </View>

            <View style={styles.itemContainer}>
              <ToggleInput title="Số ngày nợ" field="enableNumberOfDays" />
              <Input
                touched={touched.numerOfDays}
                error={errors.numerOfDays}
                onChangeText={handleChange('numerOfDays')}
                value={values.numerOfDays}
                hint={'Nhập số ngày'}
                label={'Số ngày'}
                hintTextColor={c.black1000}
                focusedColor={c.black1000}
                borderColor={c.black1000}
                editable={values.enableNumberOfDays}
              />
            </View>

            <View style={styles.itemContainer}>
              <ToggleInput
                title="Không cho phép khách hàng nợ thêm nếu vượt quá hạn mức"
                field="enableDebtLevel"
              />
              <Input
                touched={touched.debtLevel}
                error={errors.debtLevel}
                onChangeText={handleChange('debtLevel')}
                value={values.debtLevel}
                hint={'Nhập số tiền'}
                label={'Số tiền'}
                hintTextColor={c.black1000}
                focusedColor={c.black1000}
                borderColor={c.black1000}
                editable={values.enableDebtLevel}
              />
            </View>

            <View style={{...l.mx30, ...l.pt20}}>
              <Button title="Lưu" variant="primary" onPress={handleSubmit} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
});

export default DebtSettingForm;
