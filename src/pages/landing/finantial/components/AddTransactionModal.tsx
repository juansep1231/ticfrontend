import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

import { FormField } from '../../../../components/FormField';
import { transactionSchema } from '../../../../utils/finantial-validations-helper';

import { Transaction } from '../../../../types/finantial-models';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void;
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
  onAddTransaction,
}: AddTransactionModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: yupResolver(transactionSchema),
  });

  const onSubmit = (data: Transaction) => {
    console.log('Transacción agregada:', data);
    onAddTransaction(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Agregar Transacción
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="date"
            label="Fecha de transacción"
            type="date"
            placeholder="Seleccione la fecha de transacción"
            register={register}
            errors={errors.date}
          />
          <FormField
            id="originAccount"
            label="Cuenta de origen"
            placeholder="Ingrese la cuenta de origen"
            register={register}
            errors={errors.originAccount}
          />
          <FormField
            id="destinationAccount"
            label="Cuenta de destino"
            placeholder="Ingrese la cuenta de destino"
            register={register}
            errors={errors.destinationAccount}
          />
          <FormField
            id="value"
            label="Valor de la transacción"
            placeholder="Ingrese el valor de la transacción"
            register={register}
            errors={errors.value}
          />
          <FormField
            id="transactionType"
            label="Tipo de transacción"
            placeholder="Seleccione el tipo de transacción"
            register={register}
            errors={errors.transactionType}
            options={['INGRESO', 'EGRESO']}
          />
          <FormField
            id="description"
            label="Descripción"
            placeholder="Ingrese la descripción del evento"
            register={register}
            errors={errors.description}
          />
          <ModalFooter>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
