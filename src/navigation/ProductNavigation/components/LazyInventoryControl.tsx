import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Product/InventoryControl'),
); // Lazy-loaded

const LazyInventoryControl = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyInventoryControl;
