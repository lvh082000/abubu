import {useDialog} from 'components/Dialog';
import {MoreIcon} from 'components/SharedIcons';
import React, {useCallback} from 'react';

interface Props {
  onDelete?: () => void;
}

export const OrderDetailsHeaderActions = React.memo(({onDelete}: Props) => {
  const dialog = useDialog();

  const onModalConfirm = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const onSelect = useCallback((index: number) => {
    switch (index) {
      case 0:
        dialog.show({
          type: 'Confirmation',
          message: 'Bạn có chắc muốn hủy hóa đơn này?',
          title: 'Xác nhận',
          onModalConfirm: onModalConfirm,
        });
        break;

      case 1:
        dialog.show({
          type: 'Info',
          message: 'Tính năng in hóa đơn chỉ có trên phiên bản website.',
          title: 'Thông tin',
        });
        break;

      default:
        break;
    }
  }, []);

  return (
    <MoreIcon options={['Hủy hóa đơn', 'In hóa đơn']} onSelect={onSelect} />
  );
});
