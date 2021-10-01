import {useFormikContext} from 'formik';
import {useEffect, useRef} from 'react';

export function FormikValuesChange<FormValues>({
  onValuesChange,
  fields,
}: {
  onValuesChange: (values: FormValues) => void;
  fields: string[];
}) {
  const {values} = useFormikContext<FormValues>();
  const isMounted = useRef<boolean>(false);
  //@ts-ignore
  const deps = fields.map(v => values[v]);

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined = undefined;

    if (isMounted.current) {
      handler = setTimeout(() => {
        onValuesChange(values);
      }, 500);
    }
    setTimeout(() => {
      isMounted.current = true;
    }, 300);

    return () => {
      handler && clearTimeout(handler);
    };
  }, deps);

  return null;
}
