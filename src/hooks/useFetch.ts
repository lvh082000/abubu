import {useCallback, useEffect, useState} from 'react';
import {HttpHelper} from 'services/HttpService';

interface Option<T> {
  initialData?: T | undefined;
  params?: any;
}

export function useFetch<T>(fetcher: Function, option?: Option<T>) {
  const [isLoading, setLoading] = useState<boolean>(!!option?.params);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<T | undefined>(option?.initialData);
  const [reloadId, setReload] = useState(new Date().getTime());

  const reload = useCallback(() => {
    setReload(new Date().getTime());
  }, []);

  useEffect(() => {
    async function getData() {
      if (option?.params === false) {
        return;
      }
      try {
        let data;
        setLoading(true);
        if (option?.params) {
          data = await fetcher(option.params);
        } else {
          data = await fetcher();
        }
        //@ts-ignore
        setData(data.data);
      } catch (error) {
        const errorMsg = HttpHelper.getErrorMessage(error);
        setError(errorMsg);
        console.log('[ERROR] getData', error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [option?.params, reloadId]);

  return {
    isLoading,
    error,
    data,
    reload,
    setData
  };
}
