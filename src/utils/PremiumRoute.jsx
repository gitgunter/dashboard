import { usePlan } from '@context/PlanContext';
import { Navigate } from 'react-router-dom';

function PremiumRoute({ element }) {
  const { isPlan } = usePlan();

  return isPlan === 'premium' ? element : <Navigate to='/' replace />;
}
export default PremiumRoute;
