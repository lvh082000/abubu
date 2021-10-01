import {GradientHeader} from 'components/Header';
import React from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {TabContainer, TabRoute} from 'components/MyTabBar';
import {PartnerTabRoutes} from '../components/PartnerTabRoutes';
import Information from '../Information';
import History from '../History';
import Debit from '../Debit';
import {useFetch} from 'hooks/useFetch';
import {PartnerService} from 'services/PartnerService';
import {PartnerDetailsType} from 'types/Responses/FetchGetPartnerDetailsResponse';
import {
  PartnerScreenID,
  PartnerStackParams,
} from 'navigation/PartnerNavigation';
import {RouteProp} from '@react-navigation/native';
import LoadingView from 'components/LoadingView';
import NoDataView from 'components/NoDataView';

interface Props {
  route: RouteProp<PartnerStackParams, PartnerScreenID.PartnerDetails>;
}

const PartnerDetails = ({route: {params}}: Props) => {
  const {data, isLoading} = useFetch<PartnerDetailsType>(
    PartnerService.fetchGetPartner,
    {
      params: params.id,
    },
  );

  const renderScene = ({route}: {route: TabRoute}) => {
    switch (route.key) {
      case 'info':
        return <Information partner={data as PartnerDetailsType} />;
      case 'history':
        return <History partner={data as PartnerDetailsType} />;
      case 'debit':
        return <Debit partner={data as PartnerDetailsType} />;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return <TabContainer routes={PartnerTabRoutes} renderScene={renderScene} />;
  };

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={data?.name as string}
      />
      {renderContent()}
    </View>
  );
};

export default PartnerDetails;
