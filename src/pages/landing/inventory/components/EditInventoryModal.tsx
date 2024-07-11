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
import { inventorySchema } from '../../../../utils/inventory-validations-helper';

import { Inventory } from '../../../../types/inventory-models';
import { useFetchProducts } from '../../../../hooks/inventory/fetchProductHook';
import useFetchInventoryMovementTypes from '../../../../hooks/inventory/fetchMovementTypeHooks';


interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Inventory | null;
  onSubmit: (data: { movements: Inventory }) => void;
}

export const EditInventoryModal = ({
  isOpen,
  onClose,
  inventory,
  onSubmit,
}: AddInventoryModalProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Inventory>({
    resolver: yupResolver(inventorySchema),
  });

  useEffect(() => {
    if (inventory) {
      // Set initial form values when info prop changes
      Object.keys(inventory).forEach((key) => {
        setValue(key as keyof Inventory, inventory[key as keyof Inventory]);
      });
    }
  }, [inventory, setValue]);

  const handleFormSubmit = (data: Inventory) => {
    onSubmit({ movements: data });
    onClose();
  };
  const { products } = useFetchProducts();
  const { inventoryMovementTypes} = useFetchInventoryMovementTypes();
  const productNames = products.map(product => product.name);
  const inventoryMovementTypesNames = inventoryMovementTypes.map(inventoryMovement => inventoryMovement.movement_Type_Name);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'sm' }}>
        <ModalHeader color="brand.blue" textAlign="center">
          Editar Inventario
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="product"
            label="Producto"
            placeholder="Seleccione el producto"
            register={register}
            errors={errors.product}
            options={productNames}
          />
          <FormField
            id="movementType"
            label="Tipo de movimiento"
            placeholder="Seleccione el tipo de movimiento"
            register={register}
            errors={errors.product}
            options={inventoryMovementTypesNames}
          />
          <FormField
            id="quantity"
            label="Cantidad"
            placeholder="Ingrese la cantidad"
            register={register}
            errors={errors.quantity}
          />
          <FormField
            id="date"
            label="Fecha"
            placeholder="Seleccione la fecha del movimiento"
            type="date"
            register={register}
            errors={errors.date}
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
