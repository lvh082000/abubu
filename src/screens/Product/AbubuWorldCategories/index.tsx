import React, {Suspense} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {GradientHeader} from 'components/Header';

const Container = React.lazy(() => import('./components/Container')); // Lazy-loaded

const AbubuWorldCategories = () => {
  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Chọn ngành hàng"
      />
      <Suspense fallback={null}>
        <Container />
      </Suspense>
    </View>
  );
};

export default AbubuWorldCategories;
