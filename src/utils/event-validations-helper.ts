import * as yup from 'yup';

export const eventsSchema = yup.object().shape({
  id: yup.number().integer().positive().optional(),
  title: yup.string().required('El título es obligatorio'),
  status: yup.string().required('El estado del evento es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
  startDate: yup.string().required('La fecha de inicio es obligatoria'),
  endDate: yup.string().required('La fecha de fin es obligatoria'),
  budget: yup
    .number()
    .positive('El presupuesto debe ser un número positivo')
    .required('El presupuesto es obligatorio'),
  budgetStatus: yup
    .string()
    .required('El estado del presupuesto es obligatorio'),
  location: yup.string().required('El lugar es obligatorio'),
  income: yup
    .number()
    .positive('Los ingresos deben ser un número positivo')
    .optional(),
});
