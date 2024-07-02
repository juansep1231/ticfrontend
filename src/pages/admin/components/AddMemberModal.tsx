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

import {
  Member,
  faculties,
  careers,
  positions,
  semesters,
} from '../../../types/organizational-models';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal = ({ isOpen, onClose }: AddMemberModalProps) => {
  const [member, setMember] = useState<Member>({
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

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ p: 'lg' }}>
        <ModalHeader sx={{ color: 'brand.blue', textAlign: 'center' }}>
          Agregar Miembro Administrativo{' '}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ textColor: 'text.default' }}>
          <FormControl id="firstName" sx={{ mb: 'sm' }}>
            <FormLabel>Nombres</FormLabel>
            <Input
              value={member.firstName}
              onChange={(e) =>
                setMember({ ...member, firstName: e.target.value })
              }
              placeholder="Ingrese los nombres"
            />
          </FormControl>
          <FormControl id="lastName" sx={{ mb: 'sm' }}>
            <FormLabel>Apellidos</FormLabel>
            <Input
              value={member.lastName}
              onChange={(e) =>
                setMember({ ...member, lastName: e.target.value })
              }
              placeholder="Ingrese los apellidos"
            />
          </FormControl>
          <FormControl id="birthDate" sx={{ mb: 'sm' }}>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              type="date"
              value={member.birthDate}
              onChange={(e) =>
                setMember({ ...member, birthDate: e.target.value })
              }
              placeholder="Seleccione la fecha de nacimiento"
            />
          </FormControl>
          <FormControl id="phoneNumber" sx={{ mb: 'sm' }}>
            <FormLabel>Número de Celular</FormLabel>
            <Input
              value={member.cellphone}
              onChange={(e) =>
                setMember({ ...member, cellphone: e.target.value })
              }
              placeholder="Ingrese el número de celular"
            />
          </FormControl>
          <FormControl id="faculty" sx={{ mb: 'sm' }}>
            <FormLabel>Facultad</FormLabel>
            <Select
              placeholder="Seleccione la facultad"
              value={member.faculty}
              onChange={(e) =>
                setMember({ ...member, faculty: e.target.value })
              }
            >
              {faculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="career" sx={{ mb: 'sm' }}>
            <FormLabel>Carrera</FormLabel>
            <Select
              placeholder="Seleccione la carrera"
              value={member.career}
              onChange={(e) => setMember({ ...member, career: e.target.value })}
            >
              {careers.map((career, index) => (
                <option key={index} value={career}>
                  {career}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="semester" sx={{ mb: 'sm' }}>
            <FormLabel>Semestre</FormLabel>
            <Select
              placeholder="Seleccione el semestre"
              value={member.semester}
              onChange={(e) =>
                setMember({ ...member, semester: e.target.value })
              }
            >
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="email" sx={{ mb: 'sm' }}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              value={member.email}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
              placeholder="Ingrese el correo electrónico"
            />
          </FormControl>
          <FormControl id="faculty" sx={{ mb: 'sm' }}>
            <FormLabel>Rol</FormLabel>
            <Select
              placeholder="Seleccione el rol"
              value={member.position}
              onChange={(e) =>
                setMember({ ...member, position: e.target.value })
              }
            >
              {positions.map((position, index) => (
                <option key={index} value={position}>
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
