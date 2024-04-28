/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from '@context/AuthContext';
import { SidebarProvider } from '@context/SidebarContext';
import { ToastProvider } from '@context/ToastContext';
import { PlanProvider } from '@context/PlanContext';

// Page components
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './Dashboard';
//Dashboard page components
const Resumen = lazy(() => import('./pages/Resumen/Resumen'));
const Examenes = lazy(() => import('./pages/Examenes/Examenes'));
const Detalles = lazy(() => import('./pages/Detalles/Detalles'));
const Temario = lazy(() => import('./pages/Temario/Temario'));
const Notas = lazy(() => import('./pages/Notas/Notas'));
const Novedades = lazy(() => import('./pages/Novedades/Novedades'));
// Dashboard modalidades
const UnMinuto = lazy(() => import('./pages/Modalidades/UnMinuto/UnMinuto'));
const QuickTest = lazy(() => import('./pages/Modalidades/QuickTest/QuickTest'));
const VerdadFalso = lazy(() =>
  import('./pages/Modalidades/VerdadFalso/VerdadFalso')
);
import Capitulos from './pages/Capitulos/Capitulos';
// const Capitulos = lazy(() => import('./pages/Capitulos/Capitulos'));

// Styles
import './assets/fonts/pretendard.css';
import './styles/global.css';
import './styles/reset.css';
import PremiumRoute from '@utils/PremiumRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        element={
          <SidebarProvider>
            <Dashboard />
          </SidebarProvider>
        }
      />
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Resumen /> },
      {
        path: 'temario',
        element: <Temario />,
      },
      {
        path: 'examenes',
        element: <Examenes />,
      },
      {
        path: 'examenes/detalles/:id',
        element: <Detalles />,
      },
      {
        path: 'notas',
        element: <Notas />,
      },
      {
        path: 'novedades',
        element: <Novedades />,
      },
      {
        path: 'modalidades/quick-test',
        element: <PremiumRoute element={<QuickTest />} />,
      },
      {
        path: 'modalidades/un-minuto',
        element: <PremiumRoute element={<UnMinuto />} />,
      },
      {
        path: 'modalidades/verdad-falso',
        element: <PremiumRoute element={<VerdadFalso />} />,
      },
    ],
  },
  {
    path: '/capitulo',
    element: <ProtectedRoute element={<Capitulos />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PlanProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </PlanProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
