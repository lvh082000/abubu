import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/Shipping'),
); // Lazy-loaded

const LazyShipping = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyShipping;
