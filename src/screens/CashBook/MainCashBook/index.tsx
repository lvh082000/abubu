import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useAppDispatch, useThunkStatusAction} from 'hooks/useRedux';
import React, {Suspense, useEffect} from 'react';
import {lazily} from 'react-lazily';
import {View} from 'react-native';
import {
  fetchGetCashBookMetaData,
  GetCashBookMetaDataPrefix,
  GetIsMetaDataLoaded,
} from 'store/CashBook';
import {l} from 'styles/shared';

const {CashBookTabNavigation} = lazily(
  () => import('../../../navigation/CashBookNavigation'),
);

const MainCashBook = () => {
  const dispatch = useAppDispatch();
  const isLoaded = GetIsMetaDataLoaded();
  const {isLoading} = useThunkStatusAction(GetCashBookMetaDataPrefix);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchGetCashBookMetaData());
    }
  }, []);
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Sổ quỹ"
      />
      {!isLoading && (
        <Suspense fallback={null}>
          <CashBookTabNavigation />
        </Suspense>
      )}
      {isLoading && <LoadingView />}
    </View>
  );
};

export default MainCashBook;
