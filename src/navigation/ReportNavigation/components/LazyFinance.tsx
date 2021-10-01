import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/Report/Finance')); // Lazy-loaded

const LazyFinance = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyFinance;
