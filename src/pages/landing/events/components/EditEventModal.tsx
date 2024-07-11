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

import { FormField } from '../../../../components/FormField';
import { eventsSchema } from '../../../../utils/event-validations-helper';

import { EventView } from '../../../../types/event-models';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventView | null;
  onSubmit: (data: { event: EventView }) => void;
}

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  onSubmit,
}: AddEventModalProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventView>({
    resolver: yupResolver(eventsSchema),
  });

  const watchStatus = watch('status');

  useEffect(() => {
    if (event) {
      // Set initial form values when info prop changes
      Object.keys(event).forEach((key) => {
        setValue(key as keyof EventView, event[key as keyof EventView]);
      });
    }
  }, [event, setValue]);

  const handleFormSubmit = (data: EventView) => {
    onSubmit({ event: data });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Editar Evento
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
            id="status"
            label="Estado del evento"
            placeholder="Seleccione estado del evento"
            register={register}
            errors={errors.status}
            options={['EN REVISIÓN', 'APROBADO', 'EN PROGRESO', 'FINALIZADO']}
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
            <Button type="submit" onClick={handleSubmit(handleFormSubmit)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
