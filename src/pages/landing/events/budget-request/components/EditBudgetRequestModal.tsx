import { useEffect, useState } from 'react';
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

import { FormField } from '../../../../../components/FormField';
import { budgetRequestSchema } from '../../../../../utils/event-validations-helper';
import { BudgetRequest } from '../../../../../types/event-models';

interface AddBugdetRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: BudgetRequest | null;
  onSubmit: (data: { request: BudgetRequest }) => void;
}

export const EditBudgetRequestModal = ({
  isOpen,
  onClose,
  budget,
  onSubmit,
}: AddBugdetRequestModalProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BudgetRequest>({
    resolver: yupResolver(budgetRequestSchema),
  });

  const requestStatusName = watch('requestStatusName');

  useEffect(() => {
    if (budget) {
      // Set initial form values when info prop changes
      Object.keys(budget).forEach((key) => {
        setValue(
          key as keyof BudgetRequest,
          budget[key as keyof BudgetRequest]
        );
      });
    }
  }, [budget, setValue]);

  const handleFormSubmit = (data: BudgetRequest) => {
    onSubmit({ request: data });
    onClose();
  };

  useEffect(() => {
    setValue('requestStatusName', 'EN REVISION');
  }, [setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Editar Solicitud de Presupuesto
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="eventName"
            label="Evento"
            placeholder="Selecciona el evento"
            register={register}
            errors={errors.eventName}
            options={['Evento 1', 'Evento 2', 'Evento 3']}
            disabled={requestStatusName === 'APROBADO'}
          />
          <FormField
            id="requestStatusName"
            label="Estado de la solicitud"
            placeholder="Seleccione estado de la solicitud de presupuesto"
            register={register}
            errors={errors.requestStatusName}
            options={['EN REVISION', 'APROBADO', 'RECHAZADO']}
            defaultValue="EN REVISION"
            disabled={requestStatusName === 'APROBADO'}
          />
          <FormField
            id="reason"
            label="Motivo"
            placeholder="Ingrese el motivo de la solicitud"
            register={register}
            errors={errors.reason}
            disabled={requestStatusName === 'APROBADO'}
          />
          <FormField
            id="value"
            label="Valor"
            placeholder="Ingrese el valor por el que realiza la solicitud"
            register={register}
            errors={errors.value}
            disabled={requestStatusName === 'APROBADO'}
          />
          <ModalFooter>
            <Button type="submit" onClick={handleSubmit(handleFormSubmit)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
