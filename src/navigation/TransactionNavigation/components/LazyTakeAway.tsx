import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/TakeAway'),
); // Lazy-loaded

const LazyTakeAway = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyTakeAway;
