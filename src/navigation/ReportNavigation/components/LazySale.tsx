import React, {Suspense} from 'react';
const Container = React.lazy(() => import('../../../screens/Report/Sale')); // Lazy-loaded

const LazySale = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazySale;
