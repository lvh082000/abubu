import {Radio} from 'components/FormControls';
import Text from 'components/Text';
import {useFormikContext} from 'formik';
import React, {useMemo} from 'react';
import {useRef} from 'react';
import {useCallback} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {
  ShippingDeliveryCreateShipperModal,
  ShippingDeliveryCreateShipperModalRef,
} from './ShippingDeliveryCreateShipperModal';
import {ShippingDeliveryFormValues as FormValues} from 'types/Properties';
import {PlusIcon} from 'components/SharedIcons';
import {PartnerItemType} from 'types/Responses/FetchGetPartnersResponse';

interface Props {
  data: Array<PartnerItemType>;
  onCreate: (values: FormValues) => void;
}

const ShippingDeliverySelectShippers = React.memo(({data, onCreate}: Props) => {
  const modalRef = useRef<ShippingDeliveryCreateShipperModalRef>(null);
  const {errors, touched, setFieldValue} = useFormikContext<FormValues>();

  const options = useMemo(() => {
    return data.map(v => {
      return {
        value: v.id,
        title: `${v.name} - SĐT: ${v.phone}`,
      };
    });
  }, [data]);

  const onChangeValue = useCallback(
    value => {
      const selected = options.find(v => v.value === value);
      const id = selected ? selected.value.toString() : '';
      setFieldValue('shipper', id);
    },
    [options],
  );

  const onDone = useCallback(values => {
    Keyboard.dismiss();
    onCreate(values);
  }, []);

  const onShowModal = useCallback(() => {
    modalRef.current?.open();
  }, []);

  return (
    <>
      <View style={[{backgroundColor: c.grey100}, l.pb30]}>
        <View style={[l.py15, l.px20, l.flexRow, l.alignCtr, l.justifyBtw]}>
          <Text style={t.h5}>Lựa chọn đơn vị vận chuyển</Text>
          <TouchableOpacity
            style={[l.flexRow, l.alignCtr]}
            onPress={onShowModal}
            activeOpacity={0.7}>
            <Text style={[t.h5, t.bold, {color: c.blue600}, l.mr5]}>Thêm</Text>
            <PlusIcon style={{paddingTop: 2}} size={14} color={c.blue600} />
          </TouchableOpacity>
        </View>
        <View style={[{backgroundColor: c.white}, l.p20, l.pb5]}>
          {options.length > 0 && (
            <Radio
              onChangeValue={onChangeValue}
              widgetStyles={{
                container: [l.mt5, l.pb0],
                option: [l.justifyBtw],
              }}
              type="square"
              options={options}
              error={errors.shipper}
              touched={touched.shipper}
            />
          )}
          {options.length === 0 && (
            <Text style={[l.mb10]}>Không có dữ liệu</Text>
          )}
        </View>
      </View>
      <ShippingDeliveryCreateShipperModal onDone={onDone} ref={modalRef} />
    </>
  );
});

export default ShippingDeliverySelectShippers;
