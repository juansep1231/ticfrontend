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

import { positions, User } from '../../../types/organizational-models';
import { userSchema } from '../../../utils/validations-helper';
import { FormField } from '../../../components/FormField';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
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
          <FormField
            id="password"
            label="Contraseña"
            placeholder="Ingrese una contraseña"
            register={register}
            errors={errors.password}
            type="password"
            showPasswordToggle={true}
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
