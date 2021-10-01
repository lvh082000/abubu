import {Input, YupExtended} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {
  CashBookReceiptType,
  CreateOrUpdateReceiptTypeFormValues as FormValues,
} from 'types/Properties';
import capitalize from 'lodash/capitalize';

const validationSchema = YupExtended.object().shape({
  name: YupExtended.string().required('Vui lòng nhập tên phiếu'),
});

interface FormControlsProps {
  initialValues: FormValues;
  type: CashBookReceiptType;
  onSubmit: (values: FormValues) => void;
}

const CreateOrUpdateReceiptTypeForm = ({
  initialValues,
  type,
  onSubmit,
}: FormControlsProps) => {
  const title = useMemo(() => {
    if (type === CashBookReceiptType.Input) {
      return 'loại thu';
    }
    return 'loại chi';
  }, [type]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <View style={[l.flex, l.mx20, l.mt20]}>
            <Input
              onChangeText={handleChange('name')}
              value={values.name}
              hint={`Tên ${title}`}
              label={capitalize(title)}
              touched={touched.name}
              error={errors.name}
            />

            <Input
              onChangeText={handleChange('description')}
              value={values.description}
              hint={`Mô tả`}
              label={'Nhập mô tả'}
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
  );
};

export default React.memo(CreateOrUpdateReceiptTypeForm);
