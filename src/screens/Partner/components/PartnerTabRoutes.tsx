import React from 'react';
import VectorIcon, {IconType} from 'components/VectorIcon';

export const PartnerTabRoutes = [
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
    key: 'debit',
    title: 'Công nợ',
    icon: <VectorIcon name="database" type={IconType.materialCommunity} />,
  },
];
