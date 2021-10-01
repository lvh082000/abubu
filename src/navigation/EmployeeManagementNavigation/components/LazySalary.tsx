import React, {Suspense} from 'react';
const Container = React.lazy(
  () => import('../../../screens/EmployeeManagement/SalaryManagement'),
); // Lazy-loaded

const LazySalaryManagement = () => {
  return (
    <Suspense fallback={null}>
      <Container />
    </Suspense>
  );
};
export default LazySalaryManagement;
