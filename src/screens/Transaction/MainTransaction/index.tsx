import {GradientHeader} from 'components/Header';
import React, {Suspense, useEffect} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {lazily} from 'react-lazily';
import {useAppDispatch, useThunkStatusAction} from 'hooks/useRedux';
import {
  fetchGetOrderMetaData,
  GetIsMetaDataLoaded,
  GetOrderMetaDataPrefix,
} from 'store/Order';
import LoadingView from 'components/LoadingView';

const {TransactionTabNavigation} = lazily(
  () => import('../../../navigation/TransactionNavigation'),
);

const MainTransaction = () => {
  const dispatch = useAppDispatch();
  const isLoaded = GetIsMetaDataLoaded();
  const {isLoading} = useThunkStatusAction(GetOrderMetaDataPrefix);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchGetOrderMetaData());
    }
  }, []);

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Giao dịch"
      />
      {!isLoading && (
        <Suspense fallback={null}>
          <TransactionTabNavigation />
        </Suspense>
      )}
      {isLoading && <LoadingView />}
    </View>
  );
};

export default MainTransaction;
