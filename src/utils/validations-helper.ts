import * as yup from 'yup';

export const resetPassworSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('El correo no es válido'),
});

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('El correo no es válido'),
  position: yup.string().required('El rol es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export const infoSchema = yup.object().shape({
  id: yup.number().integer().positive().optional(),
  mission: yup.string().required('La misión es requerida'),
  vision: yup.string().required('La visión es requerida'),
});

export const memberSchema = yup.object().shape({
  id: yup.number().integer().positive().optional(),
  firstName: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  birthDate: yup.string().required('La fecha de nacimiento es obligatoria'),
  cellphone: yup
    .string()
    .required('El número de celular es obligatorio')
    .matches(/^\d+$/, 'El número de celular solo puede contener números'),
  faculty: yup.string().required('La facultad es obligatoria'),
  career: yup.string().required('La carrera es obligatoria'),
  semester: yup.string().required('El semestre es obligatorio'),
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('El correo no es válido'),
  position: yup.string().required('El rol es obligatorio'),
});
