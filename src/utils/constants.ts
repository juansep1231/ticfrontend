export const MODULES_NAVLINK = [{ name: 'Finanzas', path: '/finanzas' }];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Ayuda', path: '/ayuda' },
];

export const DROPDOWN_MENUS = [
  {
    name: 'Aportaciones',
    items: [
      { name: 'Aportantes', path: '/aportaciones/aportantes' },
      {
        name: 'Planes de suscripción',
        path: '/aportaciones/planes-suscripción',
      },
    ],
  },
  {
    name: 'Eventos',
    items: [
      { name: 'Próximos eventos', path: '/eventos' },
      { name: 'Proveedores', path: '/proveedores' },
    ],
  },
  {
    name: 'Inventario',
    items: [
      { name: 'Inventario', path: '/inventario' },
      { name: 'Productos', path: '/inventario/productos' },
      { name: 'Proveedores', path: '/proveedores' },
    ],
  },
];
