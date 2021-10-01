import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/CashBook/TotalFund'),
); // Lazy-loaded

const LazyTotalFund = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyTotalFund;
