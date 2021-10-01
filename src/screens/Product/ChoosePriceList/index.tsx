import {RouteProp} from '@react-navigation/native';
import AddButton from 'components/AddButton';
import {Radio} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';
import {RightItemActionButtons} from 'components/RightItemActionButtons';
import {PrimarySearchBar} from 'components/SearchBar';
import Constants from 'config/Constants';
import {
  useAppDispatch,
  useAppSelector,
  useThunkStatusAction,
} from 'hooks/useRedux';
import {
  ProductScreenID,
  ProductStackParams,
} from 'navigation/ProductNavigation';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {
  fetchDeletePrice,
  fetchGetPrice,
  GetPricePrefix,
  PricesSelector,
} from 'store/Product';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {PriceType} from 'types/Responses/FetchGetPriceResponse';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.ChoosePriceList>;
}

const ChoosePriceList = ({route: {params}}: Props) => {
  const data = useAppSelector(PricesSelector());
  const {isLoading} = useThunkStatusAction(GetPricePrefix);
  const dispatch = useAppDispatch();
  const selectedData = useRef<PriceType>(Constants.DefaultPrice as PriceType);

  const options = useMemo(() => {
    return data?.map(v => {
      return {
        title: v.name,
        value: v.id,
        canUncheck: false,
      };
    });
  }, [data]);

  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(ProductScreenID.CreateOrUpdatePrice);
  }, []);

  const goBack = useCallback(() => {
    NavigationService.goBack();
  }, []);

  const onEdit = useCallback(
    index => {
      const price = data[index];
      NavigationService.pushToScreen(
        ProductScreenID.CreateOrUpdatePrice,
        price,
      );
    },
    [data],
  );

  const onDelete = useCallback(
    index => {
      const price = data[index];
      dispatch(fetchDeletePrice(price.id));
    },
    [data],
  );

  const onSelectValue = useCallback(
    value => {
      selectedData.current = data.find(v => v.id === value) as PriceType;
      NavigationService.goBack(1, {result: selectedData.current.id});
    },
    [data],
  );

  useEffect(() => {
    dispatch(fetchGetPrice());
  }, []);

  const rightComponent = (index: number) => {
    if (!params?.useActions || index === 0) {
      return <View />;
    }
    return (
      <RightItemActionButtons
        onEdit={onEdit}
        onDelete={onDelete}
        index={index}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (options && options.length > 0) {
      return (
        <>
          <PrimarySearchBar placeholder="Tìm kiếm" />
          <View style={ContainerStyles}>
            <Radio
              value={params?.priceSetting}
              onChangeValue={onSelectValue}
              widgetStyles={{
                container: [l.mx20, l.mt30],
                option: [l.justifyBtw],
              }}
              type="square"
              options={options}
              rightComponent={rightComponent}
            />
          </View>
        </>
      );
    }
    if (options.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Chọn bảng giá"
        goBack={goBack}
      />
      {renderContent()}
      {params?.useActions && <AddButton onPress={onAdd} />}
    </View>
  );
};

export default ChoosePriceList;
