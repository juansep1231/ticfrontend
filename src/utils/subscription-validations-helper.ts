import * as yup from 'yup';

export const subscriberSchema = yup.object().shape({
  id: yup.number().integer().positive().optional(),
  date: yup.string().required('La fecha es obligatoria'),
  name: yup.string().required('El nombre es obligatorio'),
  faculty: yup.string().required('La facultad es obligatoria'),
  career: yup.string().required('La carrera es obligatoria'),
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('El correo no es válido'),
  plan: yup.string().required('El plan es obligatorio'),
  price: yup.string().required('El precio es obligatorio'),
});

export const subscriptionPlanSchema = yup.object().shape({
  id: yup.number().integer().positive().optional(),
  planName: yup.string().required('El nombre del plan es obligatorio'),
  price: yup.number().required('El precio es obligatorio'),
  benefits: yup.string().required('Los beneficios son obligatorios'),
  academicPeriod: yup.string().required('El período académico es obligatorio'),
});
