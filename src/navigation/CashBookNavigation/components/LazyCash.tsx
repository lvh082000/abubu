import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/CashBook/Cash')); // Lazy-loaded

const LazyCash = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyCash;
