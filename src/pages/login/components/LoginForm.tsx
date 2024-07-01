import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react';

interface LoginProps {
  onSubmit: (formData: { username: string; password: string }) => void;
}

export const LoginForm = ({ onSubmit }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'space-between',
        border: '1px',
        borderColor: 'brand.blue',
        roundedBottomLeft: { sm: 'none', md: 'xl' },
        roundedTopLeft: 'xl',
        roundedTopRight: { sm: 'xl', md: 'none' },
        w: '380px',
        h: '400px',
        gap: 'md',
        p: 'xl',
      }}
    >
      <Heading
        sx={{ textAlign: 'center', fontSize: 'heading.desktop.subtitle' }}
      >
        Inicio de sesión
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Flex
          sx={{
            flexDirection: 'column',
            textAlign: 'center',
            color: 'text.default',
            fontSize: 'text.md',
            gap: 'sm',
          }}
        >
          <FormControl>
            <FormLabel>Correo institucional</FormLabel>
            <Flex>
              <Input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su correo institucional"
              />
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Flex>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
              />
            </Flex>
          </FormControl>
          <Box sx={{ textAlign: 'right' }}>
            <Link
              href="/reset-password"
              sx={{ color: 'brand.blue', fontSize: 'text.sm' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          <Flex sx={{ justifyContent: 'center' }}>
            <Button type="submit" onSubmit={() => handleSubmit}>
              Iniciar sesión
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
