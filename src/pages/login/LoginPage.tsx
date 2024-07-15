import { useNavigate } from 'react-router-dom';
import { Center, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginUser } from '../../types/organizational-models';
import { firebaseApp } from '../../firebase/firebase-config';
import { useAuth } from '../../contexts/auth-context';
import { ADMIN } from '../../utils/roles-constants';

import { LoginForm } from './components/LoginForm';

const auth = getAuth(firebaseApp);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loadingContext } = useAuth();

  const handleLogin = async (formData: LoginUser) => {
    console.log('Formulario de login enviado:', formData);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      console.log('ROL LOGIN: ' + user?.role);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingContext) {
    return (
      <Center sx={{ width: '100vw', height: '100vh' }}>
        <Spinner size="xl" sx={{ color: 'brand.blue' }} />
      </Center>
    );
  }

  if (user && user?.role == ADMIN) {
    navigate('/admin');
  } else {
    navigate('/');
  }

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
