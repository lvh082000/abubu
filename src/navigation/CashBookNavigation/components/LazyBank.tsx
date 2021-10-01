import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/CashBook/Bank')); // Lazy-loaded

const LazyBank = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyBank;
