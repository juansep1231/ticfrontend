import React, { useState } from 'react';
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

import {
  faculties,
  careers,
  positions,
  semesters,
  Member,
} from '../../../types/organizational-models';
import { FormField } from '../../../components/FormField';
import { memberSchema } from '../../../utils/validations-helper';

import { RegisterModal } from './RegisterModal';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Member) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
}) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Member>({
    resolver: yupResolver(memberSchema),
  });

  const onSubmit = (data: Member) => {
    console.log('Nuevo miembro agregado:', data);
    onAddMember(data);
    onClose();
    setIsRegisterModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="4">
          <ModalHeader color="brand.blue" textAlign="center">
            Agregar Miembro Administrativo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textColor="text.default">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                id="firstName"
                label="Nombres"
                placeholder="Ingrese los nombres"
                register={register}
                errors={errors.firstName}
              />
              <FormField
                id="lastName"
                label="Apellidos"
                placeholder="Ingrese los apellidos"
                register={register}
                errors={errors.lastName}
              />
              <FormField
                id="birthDate"
                label="Fecha de Nacimiento"
                placeholder="Seleccione la fecha de nacimiento"
                type="date"
                register={register}
                errors={errors.birthDate}
              />
              <FormField
                id="cellphone"
                label="Número de Celular"
                placeholder="Ingrese el número de celular"
                register={register}
                errors={errors.cellphone}
              />
              <FormField
                id="faculty"
                label="Facultad"
                placeholder="Seleccione la facultad"
                register={register}
                errors={errors.faculty}
                options={faculties}
              />
              <FormField
                id="career"
                label="Carrera"
                placeholder="Seleccione la carrera"
                register={register}
                errors={errors.career}
                options={careers}
              />
              <FormField
                id="semester"
                label="Semestre"
                placeholder="Seleccione el semestre"
                register={register}
                errors={errors.semester}
                options={semesters}
              />
              <FormField
                id="email"
                label="Correo Institucional"
                placeholder="Ingrese el correo institucional"
                type="email"
                register={register}
                errors={errors.email}
              />
              <FormField
                id="position"
                label="Rol"
                placeholder="Seleccione el rol"
                register={register}
                errors={errors.position}
                options={positions}
              />
              <ModalFooter>
                <Button type="submit">Guardar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};
