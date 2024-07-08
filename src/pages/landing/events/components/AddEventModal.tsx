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
import { eventsSchema } from '../../../../utils/event-validations-helper';

import { EventView } from '../../../../types/event-models';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventView) => void;
}

export const AddEventModal = ({
  isOpen,
  onClose,
  onAddEvent,
}: AddEventModalProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<EventView>({
    resolver: yupResolver(eventsSchema),
  });

  const watchStatus = watch('status');

  const onSubmit = (data: EventView) => {
    console.log('Nuevo evento agregado:', data);
    onAddEvent(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Agregar Evento
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="title"
            label="Título"
            placeholder="Ingrese el nombre del evento"
            register={register}
            errors={errors.title}
          />
          <FormField
            id="description"
            label="Descripción"
            placeholder="Ingrese la descripción del evento"
            register={register}
            errors={errors.description}
          />
          <FormField
            id="startDate"
            label="Fecha de inicio"
            placeholder="Seleccione la fecha de inicio"
            type="date"
            register={register}
            errors={errors.startDate}
          />
          <FormField
            id="endDate"
            label="Fecha de fin"
            placeholder="Seleccione la fecha de fin"
            type="date"
            register={register}
            errors={errors.endDate}
          />
          <FormField
            id="budget"
            label="Presupuesto"
            placeholder="Ingrese el valor del presupuesto"
            register={register}
            errors={errors.budget}
          />
          <FormField
            id="budgetStatus"
            label="Estado del presupuesto"
            placeholder="Seleccione el estado del presupuesto"
            register={register}
            errors={errors.budgetStatus}
            options={['EN REVISIÓN', 'APROBADO', 'RECHAZADO']}
          />
          <FormField
            id="location"
            label="Lugar"
            placeholder="Ingrese el lugar"
            register={register}
            errors={errors.location}
          />
          <FormField
            id="provider"
            label="Proveedor"
            placeholder="Seleccione el proveedor"
            register={register}
            errors={errors.provider}
            options={['Proveedor1', 'Proveedor2', 'Proveedor3']} // Opciones de ejemplo
          />
          <FormField
            id="status"
            label="Estado del evento"
            placeholder="Seleccione estado del evento"
            register={register}
            errors={errors.status}
            options={['EN REVISIÓN', 'APROBADO', 'EN PROGRESO', 'FINALIZADO']}
          />
          {watchStatus === 'FINALIZADO' && (
            <FormField
              id="income"
              label="Ingresos"
              placeholder="Ingrese el valor de los ingresos"
              register={register}
              errors={errors.income}
            />
          )}
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
