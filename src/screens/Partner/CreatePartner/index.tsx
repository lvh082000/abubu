import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import {BasicInformationFormValues as FormValues} from 'types/Properties';
import {useSpinner} from 'components/Spinner';
import React, {useCallback, useMemo} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PartnerService} from 'services/PartnerService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import BasicInformationForm from 'components/SharedForms/BasicInformationForm';
import NavigationService from 'services/NavigationService';
import {RouteProp} from '@react-navigation/native';
import {
  PartnerScreenID,
  PartnerStackParams,
  PartnerTabScreenID,
} from 'navigation/PartnerNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';

interface Props {
  route: RouteProp<PartnerStackParams, PartnerScreenID.CreatePartner>;
}

const CreatePartner = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();

  const title = useMemo(() => {
    return PartnerService.getTitleByType(params.type);
  }, [params]);

  const initialValues: FormValues = useMemo(() => {
    return {
      taxCode: '',
      address: '',
      city: '',
      district: '',
      email: '',
      facebook: '',
      description: '',
      name: '',
      phone: '',
    };
  }, []);

  const handleBack = () => {
    if (params.useBack) {
      NavigationService.goBack();
    } else {
      NavigationService.replace(RootScreenID.MainDrawer, {
        screen: DrawerScreenID.Partner,
        params: {
          screen:
            params.type === 'guest'
              ? PartnerTabScreenID.Customers
              : PartnerTabScreenID.Providers,
        },
      });
    }
  };

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        Keyboard.dismiss();
        spinner.show();
        await PartnerService.fetchCreateOrUpdatePartner({
          ...values,
          type: params.type,
        });
        dialog.show({
          type: 'Success',
          message: `Th??ng tin ${title} ???? ???????c t???o th??nh c??ng`,
          onModalConfirm: handleBack,
          canCloseByBackdrop: false,
        });
      } catch (error) {
        console.log('[ERROR] fetchCreateOrUpdatePartner', error);
      } finally {
        spinner.dismiss();
      }
    },
    [params, title],
  );

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="M?? t??? v??? m??n h??nh n??y"
        title={`Th??m ${title}`}
        useBack
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={[l.flex]}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <BasicInformationForm
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreatePartner;
