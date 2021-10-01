import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/ReturnProduct'),
); // Lazy-loaded

const LazyReturnProduct = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyReturnProduct;
