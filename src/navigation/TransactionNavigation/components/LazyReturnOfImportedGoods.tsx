import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/ReturnOfImportedGoods'),
); // Lazy-loaded

const LazyReturnOfImportedGoods = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyReturnOfImportedGoods;
