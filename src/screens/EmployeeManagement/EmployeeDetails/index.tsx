import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {TabContainer, TabRoute} from 'components/MyTabBar';
import NoDataView from 'components/NoDataView';
import {useFetch} from 'hooks/useFetch';
import {
  EmployeeManagementScreenID,
  EmployeeManagementStackParams,
} from 'navigation/EmployeeManagementNavigation';
import React from 'react';
import {View} from 'react-native';
import {EmployeeService} from 'services/EmployeeService';
import {l} from 'styles/shared';
import {EmployeeDetailType} from 'types/Responses/FetchGetEmployeeDetailsResponse';
import {EmployeeTabRoutes} from '../components/EmployeeTabRoutes';
import History from '../History';
import Permission from '../Permission';
import PersonalInformation from '../PersonalInformation';

interface Props {
  route: RouteProp<
    EmployeeManagementStackParams,
    EmployeeManagementScreenID.EmployeeDetails
  >;
}

const EmployeeDetails = ({route: {params}}: Props) => {
  const {data, isLoading} = useFetch<EmployeeDetailType>(
    EmployeeService.fetchGetEmployeeDetails,
    {
      params: params.id,
    },
  );

  const renderScene = ({route}: {route: TabRoute}) => {
    switch (route.key) {
      case 'info':
        return <PersonalInformation employee={data as EmployeeDetailType} />;
      case 'history':
        return <History employee={data as EmployeeDetailType} />;
      case 'permission':
        return <Permission employee={data as EmployeeDetailType} />;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <TabContainer routes={EmployeeTabRoutes} renderScene={renderScene} />
    );
  };

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={data?.fullName as string}
      />
      {renderContent()}
    </View>
  );
};

export default EmployeeDetails;
