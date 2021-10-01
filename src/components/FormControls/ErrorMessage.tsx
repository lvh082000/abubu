import Text from 'components/Text';
import React from 'react';
import {InputStyles} from 'styles/elements';

interface Props {
  error?: string;
  touched?: boolean;
}

export const ErrorMessage = React.memo(({error, touched}: Props) => {
  if (error && touched) {
    return <Text style={InputStyles.errorMsg}>{error}</Text>;
  }
  return null;
});
