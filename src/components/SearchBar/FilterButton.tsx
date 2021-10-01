import ActionButton from 'components/ActionButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useMemo} from 'react';
import {c} from 'styles/shared';
import {FilterButtonProps} from './types';

export const FilterButton = React.memo(
  ({initialFilterIndex, filterOptions, onSelectFilter}: FilterButtonProps) => {
    if (!filterOptions) {
      return null;
    }
    
    const options = useMemo(() => {
      return filterOptions.map(v => v.title);
    }, []);

    return (
      <ActionButton
        onSelect={onSelectFilter}
        initialIndex={initialFilterIndex}
        options={options}>
        <VectorIcon
          color={c.black400}
          name="sort-amount-asc"
          type={IconType.fontAwesome}
        />
      </ActionButton>
    );
  },
);
