import {useFormikContext} from 'formik';
import {useEffect} from 'react';

export const FormikPatchTouched = () => {
  const {
    errors,
    setFieldTouched,
    isSubmitting,
    isValidating,
  } = useFormikContext();
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      for (const path of Object.keys(errors)) {
        setFieldTouched(path, true, false);
      }
    }
  }, [errors, isSubmitting, isValidating, setFieldTouched]);
  return null;
};
