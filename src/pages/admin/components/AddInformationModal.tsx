import React, { useState } from 'react';
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

interface AddInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddInformationModal = ({
  isOpen,
  onClose,
}: AddInformationModalProps) => {
  const [info, setInfo] = useState<OrganizationalInfo>({
    id: 0,
    mission: '',
    vision: '',
  });
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'lg' }}>
        <ModalHeader sx={{ color: 'brand.blue', textAlign: 'center' }}>
          Agregar Información de FEPON
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ textColor: 'text.default' }}>
          <FormControl id="mission" sx={{ mb: 'sm' }}>
            <FormLabel>Misión</FormLabel>
            <Textarea
              value={info.mission}
              onChange={(e) => setInfo({ ...info, mission: e.target.value })}
              placeholder="Ingrese la misión"
            />
          </FormControl>
          <FormControl id="vision" sx={{ mb: 'sm' }}>
            <FormLabel>Visión</FormLabel>
            <Textarea
              value={info.vision}
              onChange={(e) => setInfo({ ...info, vision: e.target.value })}
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
