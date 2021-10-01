import {Checkbox} from 'components/FormControls';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {OtherRevenueType} from 'types/Properties';
import {l, c, t} from 'styles/shared';
import {RightItemActionButtons} from 'components/RightItemActionButtons';
import {toStringPrice} from 'services/UtilService';

interface Props {
  item: OtherRevenueType;
  checked: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCheck: (value: {id: number; value: boolean}) => void;
}

export const SelectOtherRevenueItem = React.memo(
  ({item, checked, onEdit, onDelete, onCheck}: Props) => {
    const title = useMemo(() => {
      if (item.uom === 'cash') {
        return `${item.name} - ${toStringPrice(item.value)}`;
      }
      return `${item.name} - ${item.value}%`;
    }, []);

    const _onDelete = () => {
      onDelete(item.id as number);
    };

    const _onEdit = () => {
      onEdit(item.id as number);
    };

    const _onCheck = (checked: boolean) => {
      onCheck({
        id: item.id as number,
        value: checked,
      });
    };

    const renderRight = () => {
      return (
        <View style={[l.flex]}>
          <RightItemActionButtons
            onEdit={_onEdit}
            onDelete={_onDelete}
            style={l.justifyEnd}
          />
        </View>
      );
    };

    return (
      <Checkbox
        widgetStyles={{
          text: [{color: c.black1000}, t.h5, l.ml10],
          checkbox: {borderWidth: 1},
          container: [l.mb25, l.mx15],
        }}
        label={title}
        checked={checked}
        rightComponent={renderRight}
        revert
        onCheck={_onCheck}
      />
    );
  },
);
