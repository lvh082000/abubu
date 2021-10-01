import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/ImportProduct'),
); // Lazy-loaded

const LazyImportProduct = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyImportProduct;
