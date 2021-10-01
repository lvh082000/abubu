import React, {useCallback, useRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {FilterButtonProps, SearchButtonProps} from './types';
import {SearchButton} from './SearchButton';
import {FilterButton} from './FilterButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {Keyboard} from 'react-native';

interface Props extends SearchButtonProps, FilterButtonProps {
  placeholder?: string;
  useQRCode?: boolean;
  onQRCodeScan?: (value: string) => void;
  onSubmitEditing?: (value: string) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6EAEA',
    ...l.flexRow,
    ...l.alignCtr,
    ...l.px20,
    ...l.justifyBtw,
  },
  input: {
    color: c.black400,
    fontFamily: t.fontFamily.Winston.Medium,
    ...l.flex,
    ...l.ml10,
    height: 45,
  },
});

export const PrimarySearchBar = React.memo(
  ({
    placeholder,
    filterOptions,
    searchOptions,
    initialSearchIndex,
    initialFilterIndex,
    useQRCode,
    onQRCodeScan,
    onSelectFilter,
    onSelectSearch,
    onSubmitEditing,
  }: Props) => {
    const haveOptions = !!filterOptions && filterOptions.length > 0;
    const searchText = useRef('');

    const onScan = useCallback(() => {
      Keyboard.dismiss();
      NavigationService.pushToScreen(
        RootScreenID.QRCodeScanner,
        {},
        (data: {result: string}) => {
          onQRCodeScan?.(data.result);
        },
      );
    }, [onQRCodeScan]);

    const _onSubmitEditing = useCallback(() => {
      onSubmitEditing?.(searchText.current);
    }, [onSubmitEditing]);

    const _onChangeText = useCallback((text: string) => {
      searchText.current = text;
      if (text?.trim().length === 0) {
        onSubmitEditing?.('');
      }
    }, []);

    return (
      <View style={styles.container}>
        <View style={[l.flexRow, l.alignCtr, l.flex]}>
          <SearchButton
            initialSearchIndex={initialSearchIndex}
            onSelectSearch={onSelectSearch}
            searchOptions={searchOptions}
          />

          <TextInput
            returnKeyLabel="Tìm kiếm"
            returnKeyType="search"
            style={styles.input}
            placeholderTextColor={c.black400}
            placeholder={placeholder ?? 'Tìm kiếm'}
            selectionColor={c.black400}
            onSubmitEditing={_onSubmitEditing}
            onChangeText={_onChangeText}
          />
        </View>
        {haveOptions && (
          <FilterButton
            initialFilterIndex={initialFilterIndex}
            filterOptions={filterOptions}
            onSelectFilter={onSelectFilter}
          />
        )}
        {useQRCode && (
          <TouchableOpacity
            style={{width: 30, alignItems: 'flex-end'}}
            onPress={onScan}
            activeOpacity={0.7}>
            <VectorIcon size={20} name="qrcode" type={IconType.fontAwesome} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);
