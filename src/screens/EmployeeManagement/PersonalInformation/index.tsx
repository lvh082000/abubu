import {useDialog} from 'components/Dialog';
import GradientButton from 'components/GradientButton';
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
import {EmployeeDetailType} from 'types/Responses/FetchGetEmployeeDetailsResponse';

interface Props {
  employee: EmployeeDetailType;
}

const PersonalInformation = ({employee}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.EmployeeManagement,
      params: {
        screen: EmployeeManagementTabScreenID.Employess,
      },
    });
  };

  const onDelete = async () => {
    try {
      spinner.show();
      await EmployeeService.fetchDeleteEmployee(employee.id);
      dialog.show({
        type: 'Success',
        message: `Đã xóa nhân viên thành công`,
        onModalConfirm: handleBack,
        canCloseByBackdrop: false,
      });
    } catch (error) {
      console.log('[ERROR] fetchDeleteEmployee', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onShowConfirmModal = useCallback(() => {
    dialog.show({
      type: 'Confirmation',
      message: `Bạn có muốn xóa nhân viên này?`,
      onModalConfirm: onDelete,
    });
  }, []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        Keyboard.dismiss();
        spinner.show();
        await EmployeeService.fetchCreateOrUpdateEmployee({
          ...values,
          id: employee.id,
        });
        dialog.show({
          type: 'Success',
          message: `Thông tin nhân viên đã được cập nhật thành công`,
          onModalConfirm: handleBack,
          canCloseByBackdrop: false,
        });
      } catch (error) {
        console.log('[ERROR] fetchCreateOrUpdateEmployee', error);
      } finally {
        spinner.dismiss();
      }
    },
    [employee],
  );

  const initialValues: FormValues = useMemo(() => {
    return {
      name: employee.fullName ?? '',
      phone: employee.phone ?? '',
      dob: employee.dob ?? 1,
      taxCode: employee.taxCode ?? '',
      address: employee.address ?? '',
      city: employee.city ?? '',
      district: employee.district ?? '',
      email: employee.email ?? '',
      facebook: employee.facebook ?? '',
      description: employee.description ?? '',
      roles: employee.roles || [],
    };
  }, [employee]);

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
        {!!employee.id && (
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

export default PersonalInformation;
