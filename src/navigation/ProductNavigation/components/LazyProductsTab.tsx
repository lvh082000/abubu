import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/Product/Products')); // Lazy-loaded

const LazyProductsTab = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyProductsTab;
