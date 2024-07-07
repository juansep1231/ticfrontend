import { Flex, Heading, Image, Text } from '@chakra-ui/react';

import { User } from '../../types/organizational-models';

import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  const handleLogin = (formData: User) => {
    console.log('Formulario de login enviado:', formData);
  };

  return (
    <Flex
      flex="1"
      sx={{
        flexDirection: { sm: 'column', md: 'row' },
        px: { base: 'md', lg: '3xl' },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm onSubmit={handleLogin} />
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          bg: 'brand.blue',
          roundedBottomRight: 'xl',
          roundedTopRight: { sm: 'none', md: 'xl' },
          roundedBottomLeft: { sm: 'xl', md: 'none' },
          w: '400px',
          h: '480px',
          gap: 'md',
          p: 'xl',
          color: 'white',
        }}
      >
        <Heading
          sx={{ textAlign: 'center', fontSize: 'heading.desktop.subtitle' }}
        >
          Bienvenido a FEPON
        </Heading>
        <Image
          src="img/logo-blanco.png"
          alt="Logo Login"
          sx={{ width: '80%' }}
        />
        <Text sx={{ textAlign: 'center', fontSize: 'text.md' }}>
          Para acceder a la información que necesitas, inicia sesión
        </Text>
      </Flex>
    </Flex>
  );
};
