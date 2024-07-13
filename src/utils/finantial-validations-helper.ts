import * as yup from 'yup';

export const accountSchema = yup.object().shape({
  id: yup.number().optional(),
  accountType: yup.string().required('El tipo de cuenta es obligatorio'),
  accountName: yup.string().required('El nombre de la cuenta es obligatorio'),
  currentValue: yup
    .number()
    .required('El valor actual es obligatorio')
    .min(0, 'El valor actual no puede ser negativo'),
  date: yup.string().required('La fecha es obligatoria'),
  initialBalance: yup.number().optional(),
});

export const transactionSchema = yup.object().shape({
  date: yup.string().required('La fecha es obligatoria'),
  originAccount: yup.string().required('La cuenta de origen es obligatoria'),
  destinationAccount: yup
    .string()
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
