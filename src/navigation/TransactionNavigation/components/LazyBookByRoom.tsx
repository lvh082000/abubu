import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/Transaction/BookByRoom'),
); // Lazy-loaded

const LazyBookByRoom = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyBookByRoom;
