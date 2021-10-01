import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import BasicInformationForm from 'components/SharedForms/BasicInformationForm';
import {useSpinner} from 'components/Spinner';
import {EmployeeManagementTabScreenID} from 'navigation/EmployeeManagementNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EmployeeService} from 'services/EmployeeService';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {CreateOrUpdateEmployeeFormValues as FormValues} from 'types/Properties';

const CreateEmployee = () => {
  const dialog = useDialog();
  const spinner = useSpinner();

  const initialValues: FormValues = useMemo(() => {
    return {
      name: '',
      phone: '',
      dob: 1,
      taxCode: '',
      address: '',
      city: '',
      district: '',
      email: '',
      facebook: '',
      description: '',
    };
  }, []);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.EmployeeManagement,
      params: {
        screen: EmployeeManagementTabScreenID.Employess,
      },
    });
  };

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      Keyboard.dismiss();
      spinner.show();
      await EmployeeService.fetchCreateOrUpdateEmployee(values);
      dialog.show({
        type: 'Success',
        message: `Thông tin nhân viên đã được tạo thành công`,
        onModalConfirm: handleBack,
        canCloseByBackdrop: false,
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateOrUpdateEmployee', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Thêm nhân viên"
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

export default CreateEmployee;
