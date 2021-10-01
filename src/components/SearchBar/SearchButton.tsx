import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {c, l} from 'styles/shared';
import ActionButton from 'components/ActionButton';
import {useMemo} from 'react';
import {useCallback} from 'react';
import {SearchButtonProps} from './types';

const styles = StyleSheet.create({
  searchDropdown: {
    position: 'absolute',
    right: -16,
    width: 16,
    height: 16,
    borderRadius: 8,
    ...l.flexCenter,
  },
  searchContainer: {
    position: 'relative',
    alignItems: 'flex-start',
  },
});

export const SearchButton = React.memo(
  ({searchOptions, initialSearchIndex, onSelectSearch}: SearchButtonProps) => {
    const onSelect = useCallback(
      value => {
        onSelectSearch?.(value);
      },
      [onSelectSearch],
    );

    if (!searchOptions) {
      return (
        <VectorIcon color={c.black400} name="search" type={IconType.feather} />
      );
    }

    const options = useMemo(() => {
      return searchOptions.map(v => v.title);
    }, []);

    return (
      <ActionButton
        style={styles.searchContainer}
        onSelect={onSelect}
        initialIndex={initialSearchIndex}
        options={options}>
        <View>
          <VectorIcon
            color={c.black400}
            name="search"
            type={IconType.feather}
          />
          <VectorIcon
            style={styles.searchDropdown}
            size={16}
            type={IconType.fontAwesome}
            name="caret-down"
          />
        </View>
      </ActionButton>
    );
  },
);
