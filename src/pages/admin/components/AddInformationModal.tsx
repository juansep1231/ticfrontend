import React from 'react';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormField } from '../../../components/FormField';
import { infoSchema } from '../../../utils/admin-validations-helper';
import { OrganizationalInfo } from '../../../types/organizational-models';
import usePostAssociation from '../../../hooks/admin/createInformationTableHook';
import useFetchAssociations from '../../../hooks/admin/fetchInformationTableHook';

interface AddInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddInformationModal = ({
  isOpen,
  onClose,
}: AddInformationModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationalInfo>({
    resolver: yupResolver(infoSchema),
  });
  const { postAssociation, postError } = usePostAssociation();
  const {addAssociationState} = useFetchAssociations();
  const onSubmit = async (data: OrganizationalInfo) => {
    try {
      const newInfo = {
        mission: data.mission,
        vision: data.vision,
      };
      await postAssociation(newInfo);

      addAssociationState(newInfo);
   
    } catch (error) {
      console.error('Failed to update association:', error);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="4">
        <ModalHeader color="brand.blue" textAlign="center">
          Agregar Información de FEPON
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textColor="text.default">
          <FormField
            id="mission"
            label="Misión"
            placeholder="Ingrese la misión"
            register={register}
            errors={errors.mission}
          />
          <FormField
            id="vision"
            label="Visión"
            placeholder="Ingrese la visión"
            register={register}
            errors={errors.vision}
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
