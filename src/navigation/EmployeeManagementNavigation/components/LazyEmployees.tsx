import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/EmployeeManagement/Employees'),
); // Lazy-loaded

const LazyEmployees = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazyEmployees;
