export const MODULES_NAVLINK = [{ name: 'Finanzas', path: '/finanzas' }];

export const SUBSCRIBER_TABLE_HEADERS = [
  '',
  'Fecha', //P
  'Nombre Completo', //I
  'Facultad', //Selector
  'Carrera', //Selector
  'Correo institucional', //I
  'Plan de portación', //Selector
  'Valor', //I
];

export const SUBSCRIPTION_PLAN_TABLE_HEADERS = [
  '',
  'Nombre', //Picker
  'Precio', //I
  'Beneficios', //I
  'Periodo académico', //I
];

export const TRANSACTION_TABLE_HEADERS = [
  '',
  'Fecha', //Picker
  'Cuenta de origen', //I
  'Cuenta de destino', //I
  'Valor', //I
  'Tipo de transacción', //Selector: INGRESO, EGRESO
  'Descripción', //I
];

export const INVENTORY_TABLE_HEADERS = [
  '',
  'Producto', //Selector
  'Tipo de movimiento', //Selector: COMPRA, VENTA, DONACIÓN, DESECHO
  'Cantidad', //I
  'Fecha', //P
];

export const PRODUCTS_TABLE_HEADERS = [
  '',
  'Nombre', //I
  'Categoría', //Selector
  'Descripción', //I
  'Precio', //I
  'Cantidad',
  'Etiqueta',
  'Proveedor', //Selector
];

export const SUPPLIERS_TABLE_HEADERS = [
  '',
  'Nombre', //I
  'Teléfono Celular', //I
  'Correo', //PL INPUT
];

export const EVENTS_TABLE_HEADERS = [
  '',
  'Título', //I
  'Descripción', //I
  'Fecha de inicio', //P
  'Fecha de fin', //P
  'Presupuesto', //I
  'Estado del presupuesto', //SELECTOR: EN REVISIÓN, APROBADO, RECHAZADO
  'Lugar', //I
  'Proveedor', //SELECTOR
  'Estado', //SELECTOR: EN REVISION, APROBADO, EN PROGRESO, FINALIZADO
  'Ingresos', //I CUANDO EVENTO ESTE EN FINALIZADO APARECE EL INPUT
];

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
        path: '/aportaciones/planes-aportacion',
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
      { name: 'Proveedores', path: '/proveedores' },
      { name: 'Productos', path: '/inventario/productos' },
    ],
  },
];
