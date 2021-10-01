import {Input} from 'components/FormControls';
import {useFormikContext} from 'formik';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {l, c, t} from 'styles/shared';

interface GenerateIdInputProps {
  name: string;
  label: string;
  hint?: string;
}

const RightButton = React.memo(
  ({title, onPress}: {title: string; onPress: () => void}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[l.mt15, l.mr5]}>
        <Text style={[t.bold, {color: c.green800}]}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

export const GenerateIdInput = React.memo(
  ({name, label, hint}: GenerateIdInputProps) => {
    const {values, errors, touched} = useFormikContext();

    const onPress = useCallback(() => {}, []);

    return (
      <Input
        //@ts-ignore
        touched={touched[name]}
        //@ts-ignore
        error={errors[name]}
        //@ts-ignore
        value={values[name]}
        label={label}
        hint={hint}
        rightComponent={<RightButton onPress={onPress} title="Tạo mã" />}
        editable={false}
      />
    );
  },
);
