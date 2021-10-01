import React, {Suspense} from 'react';

const Container = React.lazy(() => import('../../../screens/Partner/Partners')); // Lazy-loaded

const LazyCustomers = () => {
  return (
    <Suspense fallback={null}>
      <Container type={'guest'} />
    </Suspense>
  );
};
export default LazyCustomers;
