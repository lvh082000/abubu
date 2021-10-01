import React, {useCallback, useEffect, useState} from 'react';
import {Select} from 'components/FormControls';
import {useFormikContext} from 'formik';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {SharedScreenID} from 'navigation/SharedNavigation';
import {SelectSharedItemType} from 'types/Properties';

interface Props {
  items: Array<any>;
  type: SelectSharedItemType;
  field: string;
  label: string;
  hint: string;
}

interface ResultCallback {
  result: {
    id: number;
    name: string;
  };
}

export const SelectWithNavigation = React.memo(
  ({items, field, label, hint, type}: Props) => {
    const {values, errors, touched, setFieldValue} =
      useFormikContext<Record<string, any>>();
    const [displayText, setDisplayText] = useState('');
    const value = values[field] as string;

    const onSelect = useCallback(() => {
      NavigationService.pushToScreen(RootScreenID.Shared, {
        screen: SharedScreenID.SelectItem,
        params: {
          value,
          type,
          resultCallback: (data: ResultCallback) => {
            setTimeout(() => {
              if (data.result) {
                setFieldValue(field, data.result.id);
                setDisplayText(data.result.name);
              } else {
                setFieldValue(field, '');
                setDisplayText('');
              }
            });
          },
        },
      });
    }, [value]);

    useEffect(() => {
      if (value && items.length > 0) {
        const selectedItem = items.find(v => value && v.id === parseInt(value));
        if (selectedItem) {
          setDisplayText(selectedItem.name);
        }
      }
    }, []);

    return (
      <Select
        touched={touched[field] as boolean}
        error={errors[field] as string | undefined}
        value={value}
        label={label}
        hint={hint}
        onSelectPress={onSelect}
        displayText={displayText}
      />
    );
  },
);
