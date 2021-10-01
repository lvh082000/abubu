import {useFormikContext} from 'formik';
import React, {useMemo, useState} from 'react';
import {Select} from 'components/FormControls';
import {OtherRevenueType} from 'types/Properties';
import {StyleProp, TextStyle, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OtherRevenueScreenID} from 'navigation/OtherRevenueNavigation';
import {RootScreenID} from 'navigation/types';
import Text from 'components/Text';
import {OrderService} from 'services/OrderService';
import {t, c, l} from 'styles/shared';
import {toStringPrice} from 'services/UtilService';

interface Props {
  inputStyle?: StyleProp<TextStyle>;
  total: number;
}

export function OtherRevenueInput<
  FormValues extends {otherRevenues: Array<number>},
>({inputStyle, total = 0}: Props) {
  const {setFieldValue, values} = useFormikContext<FormValues>();
  const [data, setData] = useState<OtherRevenueType[]>([]);
  const displayText = useMemo(() => {
    if (data.length === 0) {
      return '';
    }
    return data.map(v => v.name).join(',');
  }, [data]);

  const onSelectPress = () => {
    NavigationService.pushToScreen(RootScreenID.OtherRevenue, {
      screen: OtherRevenueScreenID.SelectOtherRevenues,
      params: {
        values: values.otherRevenues,
        resultCallback: (data: {result: Array<OtherRevenueType>}) => {
          if (data.result.length > 0) {
            const items = data.result.filter(v => !!v);
            setFieldValue(
              'otherRevenues',
              items.map(v => v.id),
            );
            setData(items);
          } else {
            setFieldValue('otherRevenues', []);
            setData([]);
          }
        },
      },
    });
  };

  const renderItem = (item: OtherRevenueType, index: number) => {
    const title = OrderService.formatUOMValueToString(item);
    return (
      <Text style={[t.pSM, {color: c.black400}]} key={index}>
        - {title}
      </Text>
    );
  };

  return (
    <>
      <Select
        label={'Thu khác'}
        hint={'Chọn thu khác nếu có'}
        onSelectPress={onSelectPress}
        value={displayText}
        displayText={displayText}
        widgetStyles={{input: inputStyle}}
      />
      {data.length > 0 && (
        <View style={[{marginTop: -10}, l.mb20, l.flexRow, l.justifyBtw]}>
          <View>{data.map(renderItem)}</View>
          <Text>Tổng thu: {toStringPrice(total)}</Text>
        </View>
      )}
    </>
  );
}
