import { createContext, useContext, useState } from 'react';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [isPlan, setIsPlan] = useState(null);

  const upgradeAccount = () => {
    // Lógica para actualizar la cuenta a premium
    setIsPlan(true);
  };

  return (
    <PlanContext.Provider value={{ isPlan, upgradeAccount }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
