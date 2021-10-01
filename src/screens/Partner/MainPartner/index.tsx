import {GradientHeader} from 'components/Header';
import React, {Suspense} from 'react';
import {lazily} from 'react-lazily';
import {View} from 'react-native';
import {l} from 'styles/shared';

const {PartnerTabNavigation} = lazily(
  () => import('../../../navigation/PartnerNavigation'),
);

const MainPartner = () => {
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Đối tác"
      />
      <Suspense fallback={null}>
        <PartnerTabNavigation />
      </Suspense>
    </View>
  );
};

export default MainPartner;
