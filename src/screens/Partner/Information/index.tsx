import {useDialog} from 'components/Dialog';
import GradientButton from 'components/GradientButton';
import BasicInformationForm from 'components/SharedForms/BasicInformationForm';
import {useSpinner} from 'components/Spinner';
import {PartnerTabScreenID} from 'navigation/PartnerNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {PartnerService} from 'services/PartnerService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {BasicInformationFormValues as FormValues} from 'types/Properties';
import {PartnerDetailsType} from 'types/Responses/FetchGetPartnerDetailsResponse';

interface Props {
  partner: PartnerDetailsType;
}

const Information = ({partner}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();

  const title = useMemo(() => {
    return PartnerService.getTitleByType(partner.type);
  }, [partner]);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Partner,
      params: {
        screen:
          partner.type === 'guest'
            ? PartnerTabScreenID.Customers
            : PartnerTabScreenID.Providers,
      },
    });
  };

  const onDelete = async () => {
    try {
      spinner.show();
      await PartnerService.fetchDeletePartner(partner.id);
      dialog.show({
        type: 'Success',
        message: `Đã xóa ${title} thành công`,
        onModalConfirm: handleBack,
        canCloseByBackdrop: false,
      });
    } catch (error) {
      console.log('[ERROR] fetchDeletePartner', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onShowConfirmModal = useCallback(() => {
    dialog.show({
      type: 'Confirmation',
      message: `Bạn có muốn xóa ${title} này?`,
      onModalConfirm: onDelete,
    });
  }, []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        Keyboard.dismiss();
        spinner.show();
        await PartnerService.fetchCreateOrUpdatePartner({
          ...values,
          type: partner.type,
          id: partner.id,
        });
        dialog.show({
          type: 'Success',
          message: `Thông tin ${title} đã được cập nhật thành công`,
          onModalConfirm: handleBack,
          canCloseByBackdrop: false,
        });
      } catch (error) {
        console.log('[ERROR] fetchCreateOrUpdatePartner', error);
      } finally {
        spinner.dismiss();
      }
    },
    [partner, title],
  );

  const initialValues: FormValues = useMemo(() => {
    return {
      taxCode: partner.taxCode ?? '',
      address: partner.address ?? '',
      city: partner.city ?? '',
      district: partner.district ?? '',
      email: partner.email ?? '',
      facebook: partner.facebook ?? '',
      description: partner.description ?? '',
      name: partner.name ?? '',
      phone: partner.phone ?? '',
      avatar: partner.avatar ?? '',
    };
  }, [partner]);

  return (
    <View style={ContainerStyles}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BasicInformationForm
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
        {!!partner.id && (
          <GradientButton
            onPress={onShowConfirmModal}
            widgetStyles={{container: [l.mx20, l.mb20, {marginTop: -15}]}}
            variant="danger"
            title="XÓA"
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Information;
