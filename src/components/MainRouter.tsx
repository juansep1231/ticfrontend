import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '../pages/home/HomePage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { HelpPage } from '../pages/help/HelpPage';
import { LoginPage } from '../pages/login/LoginPage';
import { AdminHome } from '../pages/admin/AdminHomePage';
import EventsPage from '../pages/landing/events/EventPage';
import FinantialPage from '../pages/landing/finantial/FinantialPage';
import InventoryPage from '../pages/landing/inventory/InventoryPage';
import OrganizationalPage from '../pages/landing/organizational/OrganizationalPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/inicio-sesion',
    element: <LoginPage />,
  },
  {
    path: '/ayuda',
    element: <HelpPage />,
  },
  {
    path: '/eventos',
    element: <EventsPage />,
  },
  {
    path: '/financiero',
    element: <FinantialPage />,
  },
  {
    path: '/inventario',
    element: <InventoryPage />,
  },
  {
    path: '/organizacional',
    element: <OrganizationalPage />,
  },
]);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
