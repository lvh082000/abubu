import {GradientHeader} from 'components/Header';
import React, {Suspense} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {lazily} from 'react-lazily';

const {ProductTabNavigation} = lazily(
  () => import('../../../navigation/ProductNavigation'),
);

const MainProduct = () => {
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Hàng hóa"
      />
      <Suspense fallback={null}>
        <ProductTabNavigation />
      </Suspense>
    </View>
  );
};

export default MainProduct;
