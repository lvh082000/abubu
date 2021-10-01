import OrderedNavigationButton from 'components/OrderedNavigationButton';
import VectorIcon, {IconType} from 'components/VectorIcon';
import Constants from 'config/Constants';
import {useAppSelector} from 'hooks/useRedux';
import {ProductScreenID} from 'navigation/ProductNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useState} from 'react';
import NavigationService from 'services/NavigationService';
import {PricesSelector} from 'store/Product';
import {c} from 'styles/shared';
import {PriceType} from 'types/Responses/FetchGetPriceResponse';

const DEFAULT_PRICE = Constants.DefaultPrice as PriceType;

interface Props {
  onSelected: (id: number) => void;
}

export const PriceSelection = React.memo(({onSelected}: Props) => {
  const [selectedItem, setSelect] = useState<PriceType>(DEFAULT_PRICE);
  const data = useAppSelector(PricesSelector());

  const _onSelected = (id: number) => {
    const item = data.find(v => v.id === id);
    if (item) {
      setSelect(item);
      onSelected(item.id);
    }
  };

  const navigationChoosePriceList = () => {
    NavigationService.pushToScreen(RootScreenID.Product, {
      screen: ProductScreenID.ChoosePriceList,
      params: {
        priceSetting: selectedItem.id,
        useActions: false,
        resultCallback: (data: {result: number}) => {
          _onSelected(data.result);
        },
      },
    });
  };

  return (
    <OrderedNavigationButton
      placeholder="Chọn bảng giá"
      value={selectedItem.name}
      icon={
        <VectorIcon
          color={c.brown400}
          size={18}
          name="ios-pricetags"
          type={IconType.ionIcon}
        />
      }
      onPress={navigationChoosePriceList}
    />
  );
});
