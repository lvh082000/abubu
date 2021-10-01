import React, {FC, useCallback} from 'react';
import {FlatList as RNFlatList, FlatListProps, View} from 'react-native';
import RefreshControl from './RefreshControl';
import {Flow} from 'react-native-animated-spinkit';
import {c, l} from 'styles/shared';
import NoDataView from 'components/NoDataView';

interface Props extends FlatListProps<any> {
  onRefresh?: () => void;
  refreshing?: boolean;
  isLoadingMore?: boolean;
}

export const CustomFlatList: FC<Props> = React.memo(
  ({onRefresh, refreshing = false, isLoadingMore = false, data, ...rest}) => {
    const onRefreshData = useCallback(() => {
      onRefresh?.();
    }, [onRefresh]);

    const LoadingMoreComponent = useCallback(() => {
      if (isLoadingMore) {
        return (
          <View style={[l.flex, l.flexCenter, l.mt15, l.pb10]}>
            <Flow size={40} color={c.green800} />
          </View>
        );
      }
      return null;
    }, [isLoadingMore]);

    if (data?.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }

    return (
      <RNFlatList
        {...rest}
        data={data}
        refreshControl={
          <RefreshControl onRefresh={onRefreshData} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={LoadingMoreComponent}
      />
    );
  },
);
