import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import {ProductItem} from 'components/ListItems';
import LoadingView from 'components/LoadingView';
import {HeaderSearchBar} from 'components/SearchBar';
import DeviceHelper from 'config/DeviceHelper';
import {useDataLoader} from 'hooks/useDataLoader';
import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ProductService} from 'services/ProductService';
import {ProfileService} from 'services/ProfileService';
import {cloneDeep} from 'services/UtilService';
import {ContainerStyles, ModalFullPageStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PermissionType} from 'types/Properties';
import {
  FetchGetProductsResponse,
  ProductItemType,
} from 'types/Responses/FetchGetProductsResponse';
import {SelectedButton} from './components/SelectButton';

interface Props {
  selectedPrice: number;
  visible: boolean;
  onModalClosed: (ids: Array<number>) => void;
  dismiss: () => void;
  numberOfSelected: number;
}

const SelectProducts = ({
  selectedPrice,
  visible,
  dismiss,
  onModalClosed,
  numberOfSelected,
}: Props) => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.ProductRO);

  const extraFilterParams = useMemo(() => {
    return {
      priceSetting: selectedPrice,
    };
  }, [selectedPrice]);
  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: extraFilterParams,
  });
  const {
    data,
    isLoading,
    refreshing,
    isLoadingMore,
    onRefresh,
    onEndReached,
    reload,
  } = useDataLoader<FetchGetProductsResponse>(
    hasReadOnlyPermission as boolean,
    ProductService.fetchGetProducts,
    filterParams,
  );
  const [selectedIds, setSelectIds] = useState<number[]>([]);
  const [isAnimating, setAnimate] = useState(true);

  const onItemPress = useCallback(
    (value: ProductItemType) => {
      const isExist = selectedIds.find(v => v === value.id);
      if (isExist) {
        const data = selectedIds.filter(v => v !== value.id);
        setSelectIds(data);
      } else {
        const data = [...selectedIds, value.id];
        setSelectIds(data);
      }
    },
    [selectedIds],
  );

  const onModalHide = useCallback(() => {
    if (selectedIds.length > 0) {
      const ids = cloneDeep(selectedIds);
      onModalClosed(ids);
    } else {
      onModalClosed([]);
    }
  }, [selectedIds]);

  const onModalShow = useCallback(() => {
    setTimeout(() => {
      setAnimate(false);
      if (numberOfSelected === 0) {
        setSelectIds([]);
      }
    }, 100);
  }, [numberOfSelected]);

  const onModalWillShow = () => {
    setAnimate(true);
    reload();
  };

  const onSearch = useCallback(
    text => {
      setFilterParams({
        keyword: text,
        sort: 'createdAt,desc',
        extraFilterParams: extraFilterParams,
      });
    },
    [extraFilterParams],
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductItemType;
    index: number;
  }) => {
    const isSelected = !!selectedIds.find(v => v === item.id);

    return (
      <ProductItem
        isSelected={isSelected}
        onItemPress={onItemPress}
        item={item}
        index={index}
      />
    );
  };

  const renderContent = () => {
    if (!hasReadOnlyPermission) {
      return <ErrorView message="Bạn không có quyền để xem mục này!" />;
    }
    if (isLoading || isAnimating) {
      return <LoadingView />;
    }
    if (data.length > 0) {
      return (
        <>
          <CustomFlatList
            renderItem={renderItem}
            keyExtractor={(item: ProductItemType) => item.id.toString()}
            data={data}
            refreshing={refreshing}
            isLoadingMore={isLoadingMore}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
          />
          <SelectedButton
            onPress={dismiss}
            numberOfSelected={selectedIds.length}
          />
        </>
      );
    }
  };

  return (
    <Modal
      onModalWillShow={onModalWillShow}
      onModalShow={onModalShow}
      animationInTiming={200}
      animationOut="slideOutRight"
      animationIn="slideInRight"
      animationOutTiming={200}
      onModalHide={onModalHide}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}
      deviceHeight={DeviceHelper.height}
      statusBarTranslucent={true}
      isVisible={visible}
      style={ModalFullPageStyles}>
      <View style={ContainerStyles}>
        <HeaderSearchBar onSubmitEditing={onSearch} onClose={dismiss} />
        {renderContent()}
      </View>
    </Modal>
  );
};

export default SelectProducts;
