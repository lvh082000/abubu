import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Product/PriceSetting'),
); // Lazy-loaded

const LazyPriceSetting = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyPriceSetting;
