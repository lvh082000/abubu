import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {c, l, t} from 'styles/shared';

interface Props {
  customer: string;
  description: string;
  createdBy?: string;
}

const CustomerOrderDetails = React.memo(
  ({customer, description, createdBy}: Props) => {
    return (
      <View style={[{backgroundColor: c.grey100}, l.pb30]}>
        <View style={[{backgroundColor: c.white}, l.p20]}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[l.flexRow, l.mb5, l.alignCtr]}>
            <VectorIcon
              color={c.brown400}
              size={20}
              name="person"
              type={IconType.material}
            />
            <Text style={[t.bold, t.h5, l.ml5, l.mr5, {color: c.green800}]}>
              {customer}
            </Text>
            <NavigationNext size={20} color={c.green800} />
          </TouchableOpacity>
          <Text style={[l.mt5]}>{description}</Text>
          {!!createdBy && (
            <Text style={[l.mt5]}>Người tạo đơn: {createdBy}</Text>
          )}
        </View>
      </View>
    );
  },
);

export default CustomerOrderDetails;
