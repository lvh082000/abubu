import {useDialog} from 'components/Dialog';
import GradientButton from 'components/GradientButton';
import {useSpinner} from 'components/Spinner';
import {useFetch} from 'hooks/useFetch';
import {parseInt} from 'lodash';
import {EmployeeManagementTabScreenID} from 'navigation/EmployeeManagementNavigation';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {EmployeeService} from 'services/EmployeeService';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {CreateOrUpdateEmployeeFormValues as FormValues} from 'types/Properties';
import {EmployeeDetailType} from 'types/Responses/FetchGetEmployeeDetailsResponse';
import {RoleType} from 'types/Responses/FetchGetRoleListResponse';
import {PermissionItem, PermissionType} from './components/PermissionItem';

interface Props {
  employee: EmployeeDetailType;
}

const Permission = ({employee}: Props) => {
  const {data} = useFetch<RoleType[]>(EmployeeService.fetchGetRoleList);
  const [roles, setRoles] = useState<number[]>(employee.roles);
  const dialog = useDialog();
  const spinner = useSpinner();
  const values: FormValues = useMemo(() => {
    return {
      name: employee.fullName,
      phone: employee.phone,
      dob: employee.dob,
      taxCode: employee.taxCode,
      address: employee.address,
      city: employee.city,
      district: employee.district,
      email: employee.email,
      facebook: employee.facebook,
      description: employee.description,
      roles: roles,
    };
  }, [roles]);

  const permissions = useMemo(() => {
    return data?.map(v => {
      const enable = !!roles.find(item => item === v.id);
      return {
        ...v,
        value: enable,
      };
    });
  }, [data, roles]);

  const onValueChange = useCallback(
    (id: string, value: boolean) => {
      const roleId = parseInt(id);
      if (value) {
        setRoles([...roles, roleId]);
      } else {
        const newArr = roles.filter(v => v !== roleId);
        setRoles(newArr);
      }
    },
    [roles],
  );

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.EmployeeManagement,
      params: {
        screen: EmployeeManagementTabScreenID.Employess,
      },
    });
  };

  const handleSubmit = useCallback(async () => {
    try {
      spinner.show();
      await EmployeeService.fetchCreateOrUpdateEmployee({
        ...values,
        id: employee.id,
      });
      dialog.show({
        type: 'Success',
        message: `Quyền nhân viên đã được cập nhật thành công`,
        onModalConfirm: handleBack,
        canCloseByBackdrop: false,
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateOrUpdateEmployee', error);
    } finally {
      spinner.dismiss();
    }
  }, [roles]);

  const renderItem = ({item, index}: {item: PermissionType; index: number}) => {
    return (
      <PermissionItem
        key={index}
        item={item}
        onValueChange={value => onValueChange(item.id.toString(), value)}
        isEnableTransaction={!!roles.find(v => v === 51)}
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          data={permissions}
        />
        <GradientButton
          widgetStyles={{container: [l.my10, l.mx20]}}
          onPress={handleSubmit}
          title="LƯU"
        />
      </>
    );
  };

  return <View style={ContainerStyles}>{renderContent()}</View>;
};

export default Permission;
