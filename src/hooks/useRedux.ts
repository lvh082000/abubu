import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store";
import { FullStatusSelector, StatusSelector } from "store/Status";
import { useEffect, useRef, useState } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useThunkCallbackAction = (
  type: string,
  onSuccess: () => void,
  onError?: () => void,
  onLoad?: () => void
) => {
  const status = useAppSelector(FullStatusSelector(type));
  const numberOfChanges = useRef<number>(0);

  useEffect(() => {
    numberOfChanges.current++;
  }, [status]);

  useEffect(() => {
    if (!status || numberOfChanges.current <= 1) {
      return;
    }
    if (status === "pending") {
      onLoad?.();
    } else if (status === "fulfilled") {
      onSuccess?.();
    } else {
      onError?.();
    }
  }, [status, onLoad, onSuccess, onError]);
};

export const useThunkStatusAction = (type: string) => {
  const { error, completed, pending } = useAppSelector(StatusSelector(type));
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (error || completed) {
      if (isRefreshing) {
        setRefreshing(false);
      }
      if (isLoadingMore) {
        setLoadingMore(false);
      }
    }
  }, [error, completed, isRefreshing, isLoadingMore]);

  return {
    isLoading: pending && !isLoadingMore && !isRefreshing,
    error,
    refreshing: isRefreshing,
    loadingMore: isLoadingMore,
    setRefreshing,
    setLoadingMore,
  };
};
