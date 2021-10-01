import {Select} from 'components/FormControls';
import {ListItemsModal, ListItemsModalRef} from 'components/SharedModals';
import {useFormikContext} from 'formik';
import React, {useCallback, useMemo, useRef} from 'react';
//@ts-ignore
import db from 'database/Provinces.json';

export function SelectProvince<FormValues extends {city: string}>() {
  const {values, errors, touched, setFieldValue} =
    useFormikContext<FormValues>();
  const modalRef = useRef<ListItemsModalRef>(null);

  const open = useCallback(() => {
    modalRef.current?.open();
  }, []);

  const onSelect = useCallback((item: string) => {
    if (item !== values?.city) {
      setFieldValue('city', item);
      setFieldValue('district', '');
    }
  }, []);

  const data = useMemo(() => {
    //@ts-ignore
    return db.map(v => v.name);
  }, []);

  return (
    <>
      <Select
        value={values?.city}
        label={'Tỉnh/TP'}
        hint="Chọn Tỉnh/TP"
        //@ts-ignore
        touched={touched.city}
        //@ts-ignore
        error={errors.city}
        onSelectPress={open}
      />
      <ListItemsModal data={data} onSelect={onSelect} ref={modalRef} />
    </>
  );
}

export function SelectDistrict<
  FormValues extends {city: string; district: string},
>() {
  const {values, errors, touched, setFieldValue} =
    useFormikContext<FormValues>();

  const modalRef = useRef<ListItemsModalRef>(null);

  const open = useCallback(() => {
    modalRef.current?.open();
  }, []);

  const onSelect = useCallback((item: string) => {
    setFieldValue('district', item);
  }, []);

  const data = useMemo(() => {
    if (values?.city) {
      //@ts-ignore
      return db.find(v => v.name === values?.city).districts;
    }
    return [];
  }, [values?.city]);

  return (
    <>
      <Select
        value={values?.district}
        label={'Quận/huyện'}
        hint="Chọn Quận/huyện"
        //@ts-ignore
        touched={touched.district}
        //@ts-ignore
        error={errors.district}
        onSelectPress={open}
      />
      <ListItemsModal data={data} onSelect={onSelect} ref={modalRef} />
    </>
  );
}
