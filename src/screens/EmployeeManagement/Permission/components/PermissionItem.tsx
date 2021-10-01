import {ToggleSwitch, ToggleSwitchRef} from 'components/FormControls';
import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React, {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {t} from 'styles/shared';

export interface PermissionType {
  id: number;
  name: string;
  value: boolean;
}

interface Props {
  item: PermissionType;
  isEnableTransaction: boolean;
  onValueChange: (value: boolean) => void;
}

const windowWidth = Dimensions.get('screen').width;

export const PermissionItem = React.memo(
  ({isEnableTransaction, item, onValueChange}: Props) => {
    const toggleRef = useRef<ToggleSwitchRef>(null);
    useEffect(() => {
      if (
        !item.value &&
        isEnableTransaction &&
        (item.id === 48 || item.id === 52 || item.id === 53)
      ) {
        setTimeout(() => {
          toggleRef.current?.forceChange();
        });
      }
    }, [isEnableTransaction, item.value]);
    return (
      <ContainerItem>
        <Text style={[t.h5LG, {maxWidth: windowWidth * 0.65}]}>
          {item.name}
        </Text>
        <ToggleSwitch
          ref={toggleRef}
          handleOnPress={onValueChange}
          value={item.value}
        />
      </ContainerItem>
    );
  },
);
