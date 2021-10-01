import OrderedNavigationButton from 'components/OrderedNavigationButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {useAppSelector} from 'hooks/useRedux';
import {TransactionScreenID} from 'navigation/TransactionNavigation';
import React, {useCallback, useMemo, useState} from 'react';
import NavigationService from 'services/NavigationService';
import {RoomsSelector} from 'store/Order';
import {c} from 'styles/shared';

interface Props {
  initialValue: number | undefined;
  onSelected: (value: number) => void;
}

export const RoomSelection = React.memo(({initialValue, onSelected}: Props) => {
  const data = useAppSelector(RoomsSelector());
  const title = useMemo(() => {
    if (!initialValue) {
      return '';
    }
    const item = data.find(v => v.id === initialValue);
    return item?.name ?? '';
  }, [initialValue, data]);
  const [displayText, setDisplayText] = useState(title);

  const onPress = useCallback(() => {
    NavigationService.forcePushScreen(
      TransactionScreenID.SelectRooms,
      {
        useSelect: true,
      },
      value => {
        const item = data.find(v => v.id === value.result);
        setDisplayText(item?.name as string);
        onSelected(value.result);
      },
    );
  }, [data]);

  return (
    <OrderedNavigationButton
      onPress={onPress}
      placeholder="Thay đổi bàn"
      value={displayText}
      icon={
        <VectorIcon
          color={c.brown400}
          size={16}
          name="table-furniture"
          type={IconType.custom}
        />
      }
    />
  );
});
