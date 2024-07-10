export const faculties = [
  'Facultad de Ingeniería Eléctrica y Electrónica',
  'Facultad de Ingeniería Civil y Ambiental',
  'Facultad de Ingeniería Mecánica',
  'Facultad de Ingeniería Química y Agroindustria',
  'Facultad de Ciencias',
  'Facultad de Ciencias Administrativas',
  'Facultad de Ciencias de la Computación',
  'Facultad de Ciencias de la Tierra y Construcción',
  'Facultad de Ciencias de la Vida',
  'Facultad de Ciencias Económicas y Financieras',
];

export const careers = [
  'Ingeniería Eléctrica',
  'Ingeniería Electrónica',
  'Ingeniería Civil',
  'Ingeniería Mecánica',
  'Ingeniería Química',
  'Ingeniería en Sistemas',
  'Ingeniería Ambiental',
  'Ingeniería Industrial',
  'Arquitectura',
  'Economía',
];

export const semesters = [
  'Primero',
  'Segundo',
  'Tercero',
  'Cuarto',
  'Quinto',
  'Sexto',
  'Séptimo',
  'Octavo',
  'Noveno',
];

export const positions = [
  'Presidente',
  'Vicepresidente Académico',
  'Vocal de Vicepresidencia Académica',
  'Vicepresidente de Deportes',
  'Vocal de Vicepresidencia de Deportes',
  'Vicepresidente de Cultura',
  'Vocal de Vicepresidencia de Cultura',
  'Vicepresidente Financiero',
  'Vocal de Vicepresidencia Financiera',
];

export interface Member {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  cellphone: string;
  faculty: string;
  career: string;
  semester: string;
  email: string;
  position: string;
}

export interface User {
  id?: number;
  email: string;
  position?: string;
  password: string;
}

export interface OrganizationalInfo {
  id?: number;
  state_id?: number;
  mission: string;
  vision: string;
}

export interface UserData {
  uid: string | null;
  email: string | null;
  role: string | null;
}
