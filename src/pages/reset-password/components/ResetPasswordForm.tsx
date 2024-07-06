import { Button, Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { resetPassworSchema } from '../../../utils/validations-helper';
import { FormField } from '../../../components/FormField';

interface ResetPassworFormProps {
  onClick: () => void;
}

export const ResetPasswordForm = ({ onClick }: ResetPassworFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(resetPassworSchema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log(data);
    onClick();
  };

  return (
    <Flex
      flex="1"
      sx={{
        flexDirection: 'column',
        gap: 'md',
        width: { sm: 'sm', md: 'md' },
        boxShadow: 'md',
        p: 'xl',
      }}
    >
      <Center>
        <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
          Reestablecer contraseña
        </Heading>
      </Center>
      <Flex sx={{ color: 'text.default' }}>
        <FormField
          id="email"
          label="Correo institucional"
          placeholder="Ingrese su correo institucional"
          register={register}
          errors={errors.email}
          type="email"
        />
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Continuar
        </Button>
      </Flex>
      <Center>
        <Flex>
          <Link
            href="/inicio-sesion"
            sx={{ color: 'brand.blue', fontSize: 'text.sm' }}
          >
            Inicia sesión
          </Link>
          <Text sx={{ color: 'text.default', fontSize: 'text.sm', ml: '3xs' }}>
            con tus credenciales
          </Text>
        </Flex>
      </Center>
    </Flex>
  );
};
