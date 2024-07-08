import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  date: yup.string().required('La fecha es obligatoria'),
  originAccount: yup
    .string()
    .matches(/^\d+$/, 'La cuenta de origen solo puede contener números')
    .required('La cuenta de origen es obligatoria'),
  destinationAccount: yup
    .string()
    .matches(/^\d+$/, 'La cuenta de destino solo puede contener números')
    .required('La cuenta de destino es obligatoria'),
  value: yup
    .number()
    .positive('El valor debe ser un número positivo')
    .required('El valor es obligatorio'),
  transactionType: yup
    .string()
    .required('El tipo de transacción es obligatorio'),
  description: yup.string().required('La descripción es obligatoria'),
});
