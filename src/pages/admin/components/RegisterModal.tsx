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
  Input,
  Select,
} from '@chakra-ui/react';

import { positions, User } from '../../../types/organizational-models';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    position: '',
    password: '',
  });

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'lg' }}>
        <ModalHeader sx={{ color: 'brand.blue', textAlign: 'center' }}>
          Registrar un nuevo usuario
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ textColor: 'text.default' }}>
          <FormControl id="email" sx={{ mb: 'sm' }}>
            <FormLabel>Correo Institucional</FormLabel>
            <Input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Ingrese el correo institucional"
            />
          </FormControl>
          <FormControl id="faculty" sx={{ mb: 'sm' }}>
            <FormLabel>Rol</FormLabel>
            <Select
              placeholder="Seleccione el rol"
              value={user.position}
              onChange={(e) => setUser({ ...user, position: e.target.value })}
            >
              {positions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="password" sx={{ mb: 'sm' }}>
            <FormLabel>Ingrese una contraseña por defecto</FormLabel>
            <Input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Ingrese una contraseña"
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
