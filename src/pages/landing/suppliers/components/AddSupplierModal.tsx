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
import { suppliersSchema } from '../../../../utils/supplier-validations-helper';
import { Supplier } from '../../../../types/supplier-models';

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: Supplier) => void;
}

export const AddSupplierModal = ({
  isOpen,
  onClose,
  onAddSupplier,
}: AddSupplierModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Supplier>({
    resolver: yupResolver(suppliersSchema),
  });

  const onSubmit = (data: Supplier) => {
    onAddSupplier(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Agregar Proveedor
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="name"
            label="Nombre completo"
            placeholder="Ingrese el nombre del proveedor"
            register={register}
            errors={errors.name}
          />
          <FormField
            id="phone"
            label="Número telefónico"
            placeholder="Ingrese número telefónico"
            register={register}
            errors={errors.phone}
          />
          <FormField
            id="email"
            label="Correo"
            placeholder="Ingrese el correo electrónico"
            register={register}
            errors={errors.email}
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
