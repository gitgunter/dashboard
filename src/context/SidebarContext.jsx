/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ isSidebar, setIsSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => useContext(SidebarContext);

export { SidebarContext, SidebarProvider, useSidebar };
