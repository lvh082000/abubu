import {GradientHeader} from 'components/Header';
import React, {Suspense} from 'react';
import {lazily} from 'react-lazily';
import {View} from 'react-native';
import {l} from 'styles/shared';

const {EmployeeManagementTabNavigation} = lazily(
  () => import('../../../navigation/EmployeeManagementNavigation'),
);

const MainEmployeeManagement = () => {
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Quản lý nhân viên"
      />
      <Suspense fallback={null}>
        <EmployeeManagementTabNavigation />
      </Suspense>
    </View>
  );
};

export default MainEmployeeManagement;
