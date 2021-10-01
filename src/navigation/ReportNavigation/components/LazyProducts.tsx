import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/Report/Products')); // Lazy-loaded

const LazyProducts = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyProducts;
