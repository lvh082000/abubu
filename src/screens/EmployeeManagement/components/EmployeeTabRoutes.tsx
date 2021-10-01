import React from 'react';
import VectorIcon, {IconType} from 'components/VectorIcon';

export const EmployeeTabRoutes = [
  {
    key: 'info',
    title: 'Thông tin',
    icon: (
      <VectorIcon
        name="badge-account-horizontal"
        type={IconType.materialCommunity}
      />
    ),
  },
  {
    key: 'history',
    title: 'Lịch sử',
    icon: <VectorIcon name="history" type={IconType.fontAwesome} />,
  },
  {
    key: 'permission',
    title: 'Quyền',
    icon: <VectorIcon name="settings" type={IconType.ionIcon} />,
  },
];
