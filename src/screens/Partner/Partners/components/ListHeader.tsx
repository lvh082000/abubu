import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {PartnerService} from 'services/PartnerService';
import {c, l} from 'styles/shared';
import {PartnerType} from 'types/Properties';

interface Props {
  type: PartnerType;
  total: number;
}

const ListHeader = ({total, type}: Props) => {
  const title = useMemo(() => {
    return PartnerService.getTitleByType(type);
  }, [type]);

  return (
    <View style={[{borderBottomColor: c.green800, borderBottomWidth: 1}]}>
      <Text style={[l.mx20, l.my10]}>
        Tổng số {total} {title}
      </Text>
    </View>
  );
};

export default React.memo(ListHeader);
