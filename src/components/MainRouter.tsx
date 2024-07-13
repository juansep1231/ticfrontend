import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '../pages/home/HomePage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { HelpPage } from '../pages/help/HelpPage';
import { LoginPage } from '../pages/login/LoginPage';
import { AdminHome } from '../pages/admin/AdminHomePage';
import { ResetPasswordPage } from '../pages/reset-password/ResetPassword';
import { EventsPage } from '../pages/landing/events/EventPage';
import { ProductsPage } from '../pages/landing/inventory/products/ProductsPage';
import { TransactionPage } from '../pages/landing/finantial/transaction/TransactionPage';
import { AccountPage } from '../pages/landing/finantial/accounts/AccountPage';
import { InventoryPage } from '../pages/landing/inventory/InventoryPage';
import { SuppliersPage } from '../pages/landing/suppliers/SuppliersPage';
import { SubscribersPage } from '../pages/landing/subscriptions/subscribers/SusbcribersPage';
import { SubscriptionPlansPage } from '../pages/landing/subscriptions/subscription-plans/SusbcriptionPlansPage';
import { positions } from '../types/organizational-models';
import { BudgetRequestPage } from '../pages/landing/events/budget-request/BudgetRequestPage';

import { Layout } from './Layout';

/*const PRESIDENTE = positions[0];
const VICEPRESIDENTE_ACADEMICO = positions[1];
const VOCAL_DE_VICEPRESIDENCIA_ACADEMICA = positions[2];
const VICEPRESIDENTE_DE_DEPORTES = positions[3];
const VOCAL_DE_VICEPRESIDENCIA_DE_DEPORTES = positions[4];
const VICEPRESIDENTE_DE_CULTURA = positions[5];
const VOCAL_DE_VICEPRESIDENCIA_DE_CULTURA = positions[6];
const VICEPRESIDENTE_FINANCIERO = positions[7];
const VOCAL_DE_VICEPRESIDENCIA_FINANCIERA = positions[8];
*/

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
    path: '/eventos/solicitud-presupuesto',
    element: (
      <Layout>
        <BudgetRequestPage />
      </Layout>
    ),
  },
  {
    path: '/proveedores',
    element: (
      <Layout>
        <SuppliersPage />
      </Layout>
    ),
  },
  {
    path: '/finanzas/transacciones',
    element: (
      <Layout>
        <TransactionPage />
      </Layout>
    ),
  },
  {
    path: '/finanzas/cuentas-contables',
    element: (
      <Layout>
        <AccountPage />
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
    path: '/inventario/productos',
    element: (
      <Layout>
        <ProductsPage />
      </Layout>
    ),
  },
  {
    path: '/aportaciones/aportantes',
    element: (
      <Layout>
        <SubscribersPage />
      </Layout>
    ),
  },
  {
    path: '/aportaciones/planes-aportacion',
    element: (
      <Layout>
        <SubscriptionPlansPage />
      </Layout>
    ),
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
