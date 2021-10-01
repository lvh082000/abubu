import React, {Suspense} from 'react';

const Container = React.lazy(() => import('../../../screens/Partner/Partners')); // Lazy-loaded

const LazyProviders = () => {
  return (
    <Suspense fallback={null}>
      <Container type={'provider'} />
    </Suspense>
  );
};
export default LazyProviders;
