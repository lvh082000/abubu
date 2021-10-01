import Constants from 'config/Constants';
import {useCallback, useEffect, useRef, useState} from 'react';
import {RequestParams} from 'types/params';

interface DataType {
  total: number;
  totalPage: number;
  list: Array<any>;
}

export function useDataLoader<T extends {data: DataType}>(
  shouldGetData: boolean,
  promiseFunction: Function,
  filterParams?: Partial<RequestParams>,
) {
  const limit = filterParams?.limit ?? Constants.PageSize;
  const [reloadId, setReload] = useState(new Date().getTime());

  const [params, setParams] = useState<RequestParams>({
    limit: limit,
    page: 1,
    filter: filterParams?.filter ?? '',
    keyword: filterParams?.keyword ?? '',
    sort: filterParams?.sort ?? '',
    ...filterParams?.extraFilterParams,
  });

  const [response, setResponse] = useState<T | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(shouldGetData);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  //@ts-ignore
  const hasMore = response?.data.totalPage > params.page;
  const isMounted = useRef(false);

  const reload = useCallback(() => {
    setReload(new Date().getTime());
  }, []);

  const onEndReached = useCallback(() => {
    if (hasMore && isMounted.current) {
      setLoadingMore(true);
      setParams({
        limit: limit,
        // @ts-ignore
        page: params.page + 1,
        keyword: params.keyword,
        filter: params.filter,
        sort: params.sort,
        ...filterParams?.extraFilterParams,
      });
    }
  }, [
    params.page,
    params.filter,
    params.sort,
    params.keyword,
    filterParams?.extraFilterParams,
    limit,
    hasMore,
  ]);

  const onRefresh = useCallback(() => {
    setParams({
      limit: limit,
      page: 1,
      refreshId: new Date().getTime(),
      keyword: params.keyword,
      filter: params.filter,
      sort: params.sort,
      ...filterParams?.extraFilterParams,
    });
    setRefreshing(true);
  }, [
    limit,
    params.keyword,
    params.filter,
    params.sort,
    filterParams?.extraFilterParams,
  ]);

  useEffect(() => {
    async function fetchGetData() {
      try {
        // @ts-ignore
        const data = await promiseFunction(params);
        const total = data.data.total;

        setResponse(prevState => {
          if (refreshing) {
            return data;
          }
          const prevData = prevState?.data.list ?? [];

          if (
            // @ts-ignore
            params.page > 1 &&
            prevData[0]?.id !== data.data.list[0]?.id
          ) {
            let items = prevData;
            if (total > prevData.length) {
              items = [...prevData, ...data.data.list];
            } else {
              items = prevData;
            }
            return {
              ...data,
              data: {
                ...data.data,
                list: items,
              },
            };
          }
          return data;
        });
      } catch (error) {
        setError(error);
      }

      if (isLoading) {
        setLoading(false);
      }
      if (isLoadingMore) {
        setLoadingMore(false);
      }
      if (refreshing) {
        setRefreshing(false);
      }
    }
    if (!!shouldGetData) {
      fetchGetData();
    }
  }, [
    shouldGetData,
    isLoading,
    isLoadingMore,
    refreshing,
    params.page,
    params.filter,
    params.sort,
    params.refreshId,
    params.keyword,
    params.extraFilterParams,
    limit,
    reloadId,
  ]);

  useEffect(() => {
    if (
      params.keyword !== filterParams?.keyword ||
      params.filter !== filterParams?.filter ||
      params.sort !== filterParams?.sort ||
      params.extraFilterParams !== filterParams?.extraFilterParams
    ) {
      setLoading(true);
      setParams({
        page: 1,
        limit: limit,
        keyword: filterParams?.keyword,
        filter: filterParams?.filter,
        sort: filterParams?.sort,
        ...filterParams?.extraFilterParams,
      });
    }
  }, [
    params.keyword,
    params.filter,
    params.sort,
    params.extraFilterParams,
    filterParams?.filter,
    filterParams?.keyword,
    filterParams?.sort,
    filterParams?.extraFilterParams,
    limit,
  ]);

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
    }, 1000);
  }, []);

  const getRestResponse = () => {
    if (response?.data) {
      //@ts-ignore
      const {list, total, ...rest} = response?.data;
      return rest;
    }
    return {};
  };

  const rest: any = getRestResponse();

  return {
    data: response?.data.list ?? [],
    isLoading,
    error,
    isLoadingMore,
    refreshing,
    hasMore,
    total: response?.data.total,
    restData: rest,
    onEndReached,
    onRefresh,
    reload,
  };
}
