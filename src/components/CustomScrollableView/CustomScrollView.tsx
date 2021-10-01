import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import RefreshControl from './RefreshControl';

interface Props extends ScrollViewProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  children?: ReactNode;
}

export const CustomScrollView = forwardRef<ScrollView, Props>(
  ({children, refreshing = false, onRefresh, ...rest}, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const onRefreshData = useCallback(() => {
      onRefresh?.();
    }, [onRefresh]);

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      scrollTo: (options: {x?: number; y?: number; animated?: boolean}) => {
        scrollViewRef?.current?.scrollTo(options);
      },
    }));

    return (
      <ScrollView
        {...rest}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl onRefresh={onRefreshData} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  },
);
