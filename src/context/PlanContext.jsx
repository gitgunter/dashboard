import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const { isLoading, data } = useAuth();
  const [isPlan, setIsPlan] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setIsPlan(data.plan);
    }
  }, [isLoading, data]);

  const upgradeAccount = () => {
    setIsPlan('premium');
  };

  return (
    <PlanContext.Provider value={{ isPlan, upgradeAccount }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
