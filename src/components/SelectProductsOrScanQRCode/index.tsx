import {useDialog} from 'components/Dialog';
import {
  SelectProductsProvider,
  useSelectProducts,
} from 'components/SelectProducts/Provider';
import {NavigationNext} from 'components/SharedIcons';
import {useSpinner} from 'components/Spinner';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {c, t, l} from 'styles/shared';
import {SelectedProductType} from 'types/Properties';

interface SelectProductButtonProps {
  selectedPrice?: number;
  numberOfSelected?: number;
  onSelected: (result: Array<number>) => void;
}

interface Props
  extends Pick<SelectProductButtonProps, 'selectedPrice' | 'numberOfSelected'> {
  onSelected: (value: Array<SelectedProductType>) => void;
}

const SelectProductButton = React.memo(
  ({selectedPrice, numberOfSelected, onSelected}: SelectProductButtonProps) => {
    const {show} = useSelectProducts();

    const _onSelect = useCallback(() => {
      Keyboard.dismiss();
      show({
        selectedPrice,
        numberOfSelected,
        onSelected,
      });
    }, [selectedPrice, numberOfSelected]);

    return (
      <TouchableOpacity
        onPress={_onSelect}
        activeOpacity={0.7}
        style={[l.flexRow, l.alignCtr, l.py5]}>
        <Text style={[t.bold, l.mr5, t.h5, {color: c.green800}]}>
          Chọn sản phẩm
        </Text>
        <NavigationNext color={c.green800} />
      </TouchableOpacity>
    );
  },
);

const SelectProductsOrScanQRCode = ({
  numberOfSelected,
  selectedPrice,
  onSelected,
}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();

  const _onQRCodeScan = async (code: string) => {
    try {
      spinner.show();
      const {data} = await ProductService.fetchGetProducts({
        keyword: code,
        priceSetting: selectedPrice,
      });
      if (data.list.length > 0) {
        const ids = data.list.map(v => v.id);
        await _selectProducts(ids);
      } else {
        setTimeout(() => {
          dialog.show({
            type: 'Error',
            message: `Không có sản phẩm nào với mã "${code}"`,
          });
        }, 500);
      }
    } catch (error) {
      console.log('[ERROR] onQRCodeScan', error);
    } finally {
      spinner.dismiss();
    }
  };

  const _onScan = useCallback(() => {
    Keyboard.dismiss();
    NavigationService.pushToScreen(
      RootScreenID.QRCodeScanner,
      {},
      (data: {result: string}) => {
        _onQRCodeScan(data.result);
      },
    );
  }, [selectedPrice]);

  const _selectProducts = async (ids: Array<number>) => {
    const promises = ids.map(v => ProductService.fetchGetProduct(v));
    const data = await Promise.all(promises);
    const products = data.map(v => {
      return {
        ...v.data,
        quantity: v.data.quantity > 0 ? 1 : 0,
        inStock: v.data.quantity,
      };
    });
    onSelected(products);
  };

  const _onSelected = useCallback(async (ids: Array<number>) => {
    try {
      spinner.show();
      await _selectProducts(ids);
    } catch (error) {
      console.log('[ERROR] _onSelected', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  return (
    <SelectProductsProvider>
      <View style={[l.flexRow, l.alignCtr, l.justifyBtw, l.px20, l.py10]}>
        <SelectProductButton
          selectedPrice={selectedPrice}
          numberOfSelected={numberOfSelected}
          onSelected={_onSelected}
        />
        <TouchableOpacity
          onPress={_onScan}
          activeOpacity={0.7}
          style={[l.flexRow, l.alignCtr, l.py5]}>
          <Text style={[t.bold, l.mr5, t.h5, {color: c.green800}]}>
            Quét mã
          </Text>
          <VectorIcon
            color={c.green800}
            size={20}
            name="qrcode"
            type={IconType.fontAwesome}
          />
        </TouchableOpacity>
      </View>
    </SelectProductsProvider>
  );
};

export default React.memo(SelectProductsOrScanQRCode);
