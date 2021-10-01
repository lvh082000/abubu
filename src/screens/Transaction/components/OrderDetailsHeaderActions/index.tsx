import {useDialog} from 'components/Dialog';
import {MoreIcon} from 'components/SharedIcons';
import {useSpinner} from 'components/Spinner';
import {TransactionTabScreenID} from 'navigation/TransactionNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo} from 'react';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {OrderType} from 'types/Properties';

interface Props {
  useDelete?: boolean;
  orderId: number;
  type: OrderType;
}

export const OrderDetailsHeaderActions = React.memo(
  ({orderId, type, useDelete}: Props) => {
    const dialog = useDialog();
    const spinner = useSpinner();

    const options = useMemo(() => {
      if (useDelete) {
        return ['Hủy hóa đơn', 'In hóa đơn'];
      }
      return ['In hóa đơn'];
    }, [useDelete]);

    const handleDeleteOrder = useCallback(() => {
      switch (type) {
        case OrderType.TakeAway:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.TakeAway,
            },
          });
          break;
        case OrderType.Shipping:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.Shipping,
            },
          });
          break;
        case OrderType.BookByRoom:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.BookByRoom,
            },
          });
          break;
        case OrderType.Import:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.ImportProduct,
            },
          });
          break;
        case OrderType.Return:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.ReturnProduct,
            },
          });
          break;
        case OrderType.ReturnOrImported:
          NavigationService.replace(RootScreenID.MainDrawer, {
            screen: DrawerScreenID.Transaction,
            params: {
              screen: TransactionTabScreenID.ReturnOfImportedGoods,
            },
          });
          break;
      }
    }, [type]);

    const onDelete = useCallback(async () => {
      try {
        spinner.show();

        switch (type) {
          case OrderType.TakeAway:
          case OrderType.BookByRoom:
          case OrderType.Shipping:
            await OrderService.fetchDeleteOrder(orderId);
            break;
          case OrderType.Import:
            await OrderService.fetchDeleteImportProduct(orderId);
            break;
          case OrderType.Return:
            await OrderService.fetchDeleteReturnProduct(orderId);
            break;
          case OrderType.ReturnOrImported:
            await OrderService.fetchDeleteReturnOfImportedGood(orderId);
            break;
        }

        dialog.show({
          type: 'Success',
          message: 'Đơn hàng đã được hủy thành công',
          canCloseByBackdrop: false,
          onModalConfirm: handleDeleteOrder,
        });
      } catch (error) {
        console.log('[ERROR]', error);
      } finally {
        spinner.dismiss();
      }
    }, [type]);

    const onModalConfirm = useCallback(() => {
      onDelete?.();
    }, [onDelete]);

    const _onDelete = () => {
      dialog.show({
        type: 'Confirmation',
        message: 'Bạn có chắc muốn hủy hóa đơn này?',
        title: 'Xác nhận',
        onModalConfirm: onModalConfirm,
      });
    };

    const _onPrint = () => {
      dialog.show({
        type: 'Info',
        message: 'Tính năng in hóa đơn chỉ có trên phiên bản website.',
        title: 'Thông tin',
      });
    };

    const onSelect = useCallback(
      (index: number) => {
        if (options.length === 1) {
          _onPrint();
          return;
        }
        switch (index) {
          case 0:
            _onDelete();
            break;

          case 1:
            _onPrint();
            break;

          default:
            break;
        }
      },
      [options],
    );

    return <MoreIcon options={options} onSelect={onSelect} />;
  },
);
