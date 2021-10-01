import OrderedNavigationButton from 'components/OrderedNavigationButton';
import {
  SelectPartnersProvider,
  useSelectPartners,
} from 'components/SelectPartners/Provider';
import {useSpinner} from 'components/Spinner';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import {delay} from 'services/UtilService';
import {c} from 'styles/shared';
import {PartnerService} from 'services/PartnerService';
import {PartnerDetailsType} from 'types/Responses/FetchGetPartnerDetailsResponse';

interface Props {
  type: 'guest' | 'provider';
  onSelected: (value: PartnerDetailsType | undefined) => void;
}

const Container = React.memo(({onSelected, type}: Props) => {
  const {show} = useSelectPartners();
  const spinner = useSpinner();
  const [partner, setPartner] = useState<PartnerDetailsType | undefined>(
    undefined,
  );

  const initialPlaceholder = useMemo(() => {
    switch (type) {
      case 'guest': {
        return {
          text: 'Khách lẽ',
          icon: 'person',
          placeholder: 'Chọn khách hàng',
        };
      }

      case 'provider': {
        return {
          text: 'Nhà cung cấp',
          icon: 'people-alt',
          placeholder: 'Chọn nhà cung cấp',
        };
      }
    }
  }, [type]);

  const _onSelected = useCallback(
    async (id: number | undefined) => {
      if (!id) {
        setPartner(undefined);
        onSelected(undefined);
        return;
      }
      try {
        spinner.show();
        delay(0.5);
        const {data} = await PartnerService.fetchGetPartner(id);
        setPartner(data);
        onSelected(data);
      } catch (error) {
        console.log('[ERROR] _onSelected', error);
      } finally {
        spinner.dismiss();
      }
    },
    [onSelected],
  );

  const _onShow = useCallback(() => {
    Keyboard.dismiss();
    show({
      type,
      onSelected: _onSelected,
    });
  }, [type]);

  return (
    <OrderedNavigationButton
      placeholder={initialPlaceholder.placeholder}
      value={
        partner ? `${partner.name}\n${partner.phone}` : initialPlaceholder.text
      }
      icon={
        <VectorIcon
          color={c.brown400}
          size={20}
          name={initialPlaceholder.icon}
          type={IconType.material}
        />
      }
      onPress={_onShow}
    />
  );
});

export const PartnerSelection = React.memo(({type, onSelected}: Props) => {
  return (
    <SelectPartnersProvider>
      <Container onSelected={onSelected} type={type} />
    </SelectPartnersProvider>
  );
});
