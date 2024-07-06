import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '../pages/home/HomePage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { HelpPage } from '../pages/help/HelpPage';
import { LoginPage } from '../pages/login/LoginPage';
import { AdminHome } from '../pages/admin/AdminHomePage';
import { ResetPasswordPage } from '../pages/reset-password/ResetPassword';
import EventsPage from '../pages/landing/events/EventPage';
import FinantialPage from '../pages/landing/finantial/FinantialPage';
import InventoryPage from '../pages/landing/inventory/InventoryPage';
import OrganizationalPage from '../pages/landing/organizational/OrganizationalPage';

import { Layout } from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <AdminHome />
      </Layout>
    ),
  },
  {
    path: '/inicio-sesion',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: '/cambiar-clave',
    element: (
      <Layout>
        <ResetPasswordPage />
      </Layout>
    ),
  },
  {
    path: '/ayuda',
    element: (
      <Layout>
        <HelpPage />
      </Layout>
    ),
  },
  {
    path: '/eventos',
    element: (
      <Layout>
        <EventsPage />
      </Layout>
    ),
  },
  {
    path: '/finanzas',
    element: (
      <Layout>
        <FinantialPage />
      </Layout>
    ),
  },
  {
    path: '/inventario',
    element: (
      <Layout>
        <InventoryPage />
      </Layout>
    ),
  },
  {
    path: '/aportaciones',
    element: (
      <Layout>
        <OrganizationalPage />
      </Layout>
    ),
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
