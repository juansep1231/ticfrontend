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
import { productsSchema } from '../../../../../utils/inventory-validations-helper';

import { Product } from '../../../../../types/inventory-models';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (data: { product: Product }) => void;
}

export const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onSubmit,
}: EditProductModalProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(productsSchema),
  });

  useEffect(() => {
    if (product) {
      // Set initial form values when info prop changes
      Object.keys(product).forEach((key) => {
        setValue(key as keyof Product, product[key as keyof Product]);
      });
    }
  }, [product, setValue]);

  const handleFormSubmit = (data: Product) => {
    onSubmit({ product: data });
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
            id="name"
            label="Nombre del producto"
            placeholder="Ingrese el nombre del producto"
            register={register}
            errors={errors.name}
          />
          <FormField
            id="description"
            label="Descripción"
            placeholder="Ingrese la descripción del evento"
            register={register}
            errors={errors.description}
          />
          <FormField
            id="category"
            label="Categoría del producto"
            placeholder="Seleccione la categoría"
            register={register}
            errors={errors.category}
            options={['Categoría 1', 'Categoría 2', 'Categoría 3']}
          />
          <FormField
            id="description"
            label="Descripción"
            placeholder="Ingrese la descripción del producto"
            register={register}
            errors={errors.description}
          />
          <FormField
            id="price"
            label="Precio"
            placeholder="Ingrese el precio del producto"
            register={register}
            errors={errors.price}
          />
          <FormField
            id="quantity"
            label="Cantidad"
            placeholder="Ingrese la cantidad del producto"
            register={register}
            errors={errors.quantity}
          />
          <FormField
            id="label"
            label="Etiqueta"
            placeholder="Ingrese la etiqueta del producto"
            register={register}
            errors={errors.label}
          />
          <FormField
            id="provider"
            label="Proveedor"
            placeholder="Seleccione el proveedor"
            register={register}
            errors={errors.provider}
            options={['Proveedor1', 'Proveedor2', 'Proveedor3']} // Opciones de ejemplo
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
