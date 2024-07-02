import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import { OrganizationalInfo } from '../../../types/organizational-models';

interface EditInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: OrganizationalInfo | null;
  onSubmit: (data: { info: OrganizationalInfo }) => void;
}

export const EditInformationModal = ({
  isOpen,
  onClose,
  info,
  onSubmit,
}: EditInformationModalProps) => {
  const [formState, setFormState] = useState<OrganizationalInfo>({
    id: 0,
    mission: '',
    vision: '',
  });

  useEffect(() => {
    if (info) {
      setFormState(info);
    }
  }, [info]);

  const handleSubmit = () => {
    onSubmit({ info: formState });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'lg' }}>
        <ModalHeader sx={{ color: 'brand.blue', textAlign: 'center' }}>
          Editar Información de FEPON
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ textColor: 'text.default' }}>
          <FormControl id="mission" sx={{ mb: 'sm' }}>
            <FormLabel>Misión</FormLabel>
            <Textarea
              value={formState.mission}
              onChange={(e) =>
                setFormState({ ...formState, mission: e.target.value })
              }
              placeholder="Ingrese la misión"
            />
          </FormControl>
          <FormControl id="vision" sx={{ mb: 'sm' }}>
            <FormLabel>Visión</FormLabel>
            <Textarea
              value={formState.vision}
              onChange={(e) =>
                setFormState({ ...formState, vision: e.target.value })
              }
              placeholder="Ingrese la visión"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
