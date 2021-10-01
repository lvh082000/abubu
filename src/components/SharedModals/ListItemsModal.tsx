import {HeaderSearchBar} from 'components/SearchBar';
import Text from 'components/Text';
import DeviceHelper from 'config/DeviceHelper';
import React, {
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {c, l} from 'styles/shared';

export interface ListItemsModalRef {
  open: () => void;
  close: () => void;
}

interface ItemProps {
  item: string;
  onPress?: (item: string) => void;
}

interface Props {
  onSelect: (item: string) => void;
  data: Array<string>;
}

interface DialogHeaderProps {
  onClose: () => void;
  onSearch: (text: string) => void;
}

const styles = StyleSheet.create({
  modalContainer: {
    ...l.p0,
    ...l.m0,
    ...l.justifyStrt,
    backgroundColor: c.white,
  },
  headerContainer: {
    ...l.px20,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.pt30,
    ...l.pb10,
    backgroundColor: c.green800,
  },
  viewSearch: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.flex,
    ...l.pl10,
    borderRadius: 10,
    backgroundColor: c.white,
    height: 40,
  },
  itemContainer: {
    ...l.py15,
    ...l.px20,
    ...l.flexRow,
    ...l.justifyBtw,
    borderBottomWidth: 0.5,
    borderBottomColor: c.black200,
  },
});

const Item = React.memo(({item, onPress}: ItemProps) => {
  const _onPress = () => {
    onPress?.(item);
  };
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={_onPress}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
});

const Dialog = React.forwardRef<ListItemsModalRef, Props>(
  ({onSelect, data}, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [listItems, setListItems] = useState<string[]>(data);
    const selectedItem = useRef<string | undefined>();

    const onModalHide = () => {
      if (selectedItem.current) {
        onSelect(selectedItem.current);
      }
    };

    const close = () => {
      setVisible(false);
    };

    const open = () => {
      setVisible(true);
    };

    const onSearch = useCallback((text: string) => {
      if (text) {
        const selectedListItems = data.filter(v =>
          v.toLowerCase().includes(text.toLowerCase()),
        );
        setListItems(selectedListItems);
      } else {
        setListItems(data);
      }
    }, []);

    const onItemPress = useCallback(
      item => {
        close();
        selectedItem.current = item;
      },
      [onSelect],
    );

    useImperativeHandle(ref, () => ({
      close,
      open,
    }));

    useEffect(() => {
      setListItems(data);
    }, [data]);

    const renderItem = ({item}: {item: string}) => {
      return <Item item={item} onPress={onItemPress} />;
    };

    return (
      <>
        <Modal
          animationInTiming={200}
          animationOut="slideOutRight"
          animationIn="slideInRight"
          animationOutTiming={200}
          onModalHide={onModalHide}
          onBackdropPress={close}
          onBackButtonPress={close}
          deviceHeight={DeviceHelper.height}
          statusBarTranslucent={true}
          isVisible={visible}
          style={styles.modalContainer}>
          <HeaderSearchBar onChangeText={onSearch} onClose={close} />
          <FlatList
            keyboardShouldPersistTaps="handled"
            initialNumToRender={20}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            data={listItems}
            removeClippedSubviews={true}
          />
        </Modal>
      </>
    );
  },
);

export const ListItemsModal = React.memo(Dialog);
