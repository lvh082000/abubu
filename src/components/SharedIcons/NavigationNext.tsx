import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';

export const NavigationNext = React.memo(
  ({size = 16, color = c.white}: {size?: number; color?: string}) => {
    return (
      <VectorIcon
        size={size}
        color={color}
        type={IconType.entypo}
        name="arrow-right"
      />
    );
  },
);
