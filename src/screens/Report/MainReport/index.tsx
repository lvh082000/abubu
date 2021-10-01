import {GradientHeader} from 'components/Header';
import React, {Suspense} from 'react';
import {lazily} from 'react-lazily';
import {View} from 'react-native';
import {l} from 'styles/shared';

const {ReportTabNavigation} = lazily(
  () => import('../../../navigation/ReportNavigation'),
);

const MainReport = () => {
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Báo Cáo"
      />
      <Suspense fallback={null}>
        <ReportTabNavigation />
      </Suspense>
    </View>
  );
};

export default MainReport;
