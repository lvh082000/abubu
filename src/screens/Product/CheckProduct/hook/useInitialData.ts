import {useEffect, useState} from 'react';
import {ProductService} from 'services/ProductService';
import {ProductIntentoryItem} from 'types/Properties';

export const useGetProductsForInventory = (ids: Array<number>) => {
  const [products, setProducts] = useState<ProductIntentoryItem[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const promises = ids.map(v => ProductService.fetchGetProduct(v));
        const data = await Promise.all(promises);
        const _products = data
          .map(v => v.data)
          .map(v => {
            return {
              ...v,
              actual: 0,
            };
          });
        setProducts(_products);
      } catch (error) {
        console.log('[ERROR] useGetProductsForInventory', error);
      }
    }
    getData();
  }, [ids]);

  return {
    products,
    isLoading: products.length === 0,
    setProducts,
  };
};
