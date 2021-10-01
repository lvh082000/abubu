import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import {c, l} from 'styles/shared';
import * as Yup from 'yup';

interface Props {
  hint: string;
  label: string;
  onSubmit: (values: {name: string}) => void;
  initialValues: {name: string};
}

const AddingItemForm = ({initialValues, hint, label, onSubmit}: Props) => {
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(`Vui lòng nhập ${label.toLowerCase()}`),
    });
  }, [label]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <View style={[l.pt30, l.mx20]}>
            <Input
              touched={touched.name}
              error={errors.name}
              onChangeText={handleChange('name')}
              value={values.name}
              hint={hint}
              label={label}
              hintTextColor={c.black1000}
              focusedColor={c.black1000}
              borderColor={c.black1000}
            />
            <GradientButton
              title="LƯU"
              widgetStyles={{container: [l.mt15, l.mx0]}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default AddingItemForm;
