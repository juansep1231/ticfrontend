import React, { useState, useEffect } from 'react';
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

import {
  Member,
  faculties,
  positions,
  careers,
  semesters,
} from '../../../types/organizational-models';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onSubmit: (data: { member: Member }) => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<Member>({
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: '',
    cellphone: '',
    faculty: '',
    career: '',
    semester: '',
    email: '',
    position: '',
  });

  useEffect(() => {
    if (member) {
      setFormState(member);
    }
  }, [member]);

  const handleSubmit = () => {
    onSubmit({ member: formState });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'lg' }}>
        <ModalHeader sx={{ color: 'brand.blue', textAlign: 'center' }}>
          Editar Miembro Administrativo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ textColor: 'text.default' }}>
          <FormControl id="firstName" sx={{ mb: 'sm' }}>
            <FormLabel>Nombres</FormLabel>
            <Input
              value={formState.firstName}
              onChange={(e) =>
                setFormState({ ...formState, firstName: e.target.value })
              }
              placeholder="Ingrese los nombres"
            />
          </FormControl>
          <FormControl id="lastName" sx={{ mb: 'sm' }}>
            <FormLabel>Apellidos</FormLabel>
            <Input
              value={formState.lastName}
              onChange={(e) =>
                setFormState({ ...formState, lastName: e.target.value })
              }
              placeholder="Ingrese los apellidos"
            />
          </FormControl>
          <FormControl id="birthDate" sx={{ mb: 'sm' }}>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              type="date"
              value={formState.birthDate}
              onChange={(e) =>
                setFormState({ ...formState, birthDate: e.target.value })
              }
            />
          </FormControl>
          <FormControl id="phoneNumber" sx={{ mb: 'sm' }}>
            <FormLabel>Número de Celular</FormLabel>
            <Input
              value={formState.cellphone}
              onChange={(e) =>
                setFormState({ ...formState, cellphone: e.target.value })
              }
              placeholder="Ingrese el número de celular"
            />
          </FormControl>
          <FormControl id="faculty" sx={{ mb: 'sm' }}>
            <FormLabel>Facultad</FormLabel>
            <Select
              value={formState.faculty}
              onChange={(e) =>
                setFormState({ ...formState, faculty: e.target.value })
              }
            >
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="career" sx={{ mb: 'sm' }}>
            <FormLabel>Carrera</FormLabel>
            <Select
              value={formState.career}
              onChange={(e) =>
                setFormState({ ...formState, career: e.target.value })
              }
            >
              {careers.map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="semester" sx={{ mb: 'sm' }}>
            <FormLabel>Semestre</FormLabel>
            <Select
              value={formState.semester}
              onChange={(e) =>
                setFormState({ ...formState, semester: e.target.value })
              }
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="email" sx={{ mb: 'sm' }}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              placeholder="Ingrese el correo electrónico"
            />
          </FormControl>
          <FormControl id="position" sx={{ mb: 'sm' }}>
            <FormLabel>Rol</FormLabel>
            <Select
              value={formState.position}
              onChange={(e) =>
                setFormState({ ...formState, position: e.target.value })
              }
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
