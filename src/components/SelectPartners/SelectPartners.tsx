import {CustomFlatList} from 'components/CustomScrollableView';
import ErrorView from 'components/ErrorView';
import LoadingView from 'components/LoadingView';
import {HeaderSearchBar} from 'components/SearchBar';
import DeviceHelper from 'config/DeviceHelper';
import {useDataLoader} from 'hooks/useDataLoader';
import {PartnerScreenID} from 'navigation/PartnerNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import NavigationService from 'services/NavigationService';
import {PartnerService} from 'services/PartnerService';
import {ProfileService} from 'services/ProfileService';
import {ContainerStyles, ModalFullPageStyles} from 'styles/elements';
import {RequestParams} from 'types/Params';
import {PartnerType, PermissionType} from 'types/Properties';
import {
  FetchGetPartnersResponse,
  PartnerItemType,
} from 'types/Responses/FetchGetPartnersResponse';
import {PartnerItem} from './components/PartnerItem';
import {SelectedButton} from './components/SelectButton';

interface Props {
  visible: boolean;
  onModalClosed: (id: number | undefined) => void;
  dismiss: () => void;
  type: PartnerType;
}

const SelectPartners = ({type, visible, dismiss, onModalClosed}: Props) => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.PartnerRO);

  const [filterParams, setFilterParams] = useState<RequestParams>({
    keyword: '',
    sort: 'createdAt,desc',
    extraFilterParams: {
      type: type,
    },
  });

  const {
    data,
    isLoading,
    refreshing,
    isLoadingMore,
    onRefresh,
    onEndReached,
    reload,
  } = useDataLoader<FetchGetPartnersResponse>(
    hasReadOnlyPermission as boolean,
    PartnerService.fetchGetPartners,
    filterParams,
  );
  const [isAnimating, setAnimate] = useState(true);
  const [selectedId, setSelectId] = useState<number | undefined>(undefined);

  const onItemPress = useCallback(
    (value: PartnerItemType) => {
      if (value.id === selectedId) {
        setSelectId(undefined);
      } else {
        setSelectId(value.id);
      }
    },
    [selectedId],
  );

  const onModalHide = useCallback(() => {
    onModalClosed(selectedId);
  }, [selectedId]);

  const onModalShow = useCallback(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 100);
  }, []);

  const onModalWillShow = () => {
    setAnimate(true);
    reload();
  };

  const onSearch = useCallback(text => {
    setFilterParams({
      keyword: text,
      sort: 'createdAt,desc',
      extraFilterParams: {
        type: type,
      },
    });
  }, []);

  const onSelectedButtonPress = useCallback(() => {
    if (selectedId) {
      dismiss();
    } else {
      dismiss();
      setTimeout(() => {
        NavigationService.pushToScreen(RootScreenID.Partner, {
          screen: PartnerScreenID.CreatePartner,
          params: {
            type,
            useBack: true,
          },
        });
      }, 300);
    }
  }, [selectedId]);

  useEffect(() => {
    setFilterParams({
      keyword: '',
      sort: 'createdAt,desc',
      extraFilterParams: {
        type: type,
      },
    });
  }, [type]);

  const renderItem = ({
    item,
    index,
  }: {
    item: PartnerItemType;
    index: number;
  }) => {
    const isSelected = selectedId === item.id;

    return (
      <PartnerItem
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
    return (
      <>
        <CustomFlatList
          renderItem={renderItem}
          keyExtractor={(item: PartnerItemType) => item.id.toString()}
          data={data}
          refreshing={refreshing}
          isLoadingMore={isLoadingMore}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
        />
        {data.length > 0 && (
          <SelectedButton
            isSelected={!!selectedId}
            onPress={onSelectedButtonPress}
          />
        )}
      </>
    );
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

export default SelectPartners;
