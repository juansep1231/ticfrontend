import {
  Box,
  Flex,
  Link as ChakraLink,
  Image,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { getAuth, signOut } from 'firebase/auth';

import { NAV_LINKS } from '../utils/constants';
import { firebaseApp } from '../firebase/firebase-config';
import { useAuth } from '../contexts/auth-context';

const MotionVStack = motion(VStack);

const auth = getAuth(firebaseApp);
export const Navbar = () => {
  const { token } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const menuIcon = isOpen ? (
    <CloseIcon sx={{ color: 'black' }} />
  ) : (
    <HamburgerIcon sx={{ color: 'black' }} />
  );

  return (
    <Box
      sx={{
        borderBottom: '1px',
        borderColor: 'gray.100',
        px: { sm: 'sm', lg: '3xl' },
        py: 'xs',
        a: {
          rounded: 'md',
          color: 'brand.blue',
          textAlign: 'center',
          _hover: {
            fontWeight: 'semibold',
            textDecoration: 'none',
            color: 'primary.default',
          },
        },
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: { base: 'text.sm', md: 'text.md' },
        }}
      >
        <ChakraLink
          as={RouterLink}
          to="/"
          sx={{
            width: 'auto',
          }}
        >
          <Image
            src="/img/imagotipo.png"
            alt="Logo Fepon"
            sx={{ maxWidth: 'none', height: '12' }}
          />
        </ChakraLink>

        <Flex
          sx={{
            display: { base: 'none', lg: 'flex' },
            alignItems: 'center',
            gap: 'xl',
          }}
        >
          {NAV_LINKS.map((link) => (
            <ChakraLink
              key={link.path}
              as={RouterLink}
              to={link.path}
              sx={{
                _activeLink: {
                  textColor: 'primary.300',
                  fontWeight: 'semibold',
                },
              }}
            >
              {link.name}
            </ChakraLink>
          ))}
          <ChakraLink
            as={RouterLink}
            to="/inicio-sesion"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2xs',
              p: 'xs',
              border: '1px solid',
              borderColor: 'brand.blue',
              _hover: {
                borderColor: 'primary.default',
              },
              _activeLink: {
                textColor: 'primary.300',
                borderColor: 'primary.300',
                fontWeight: 'semibold',
              },
            }}
          >
            <FiLogIn /> Ingresar
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/admin"
            onClick={() => signOut(auth)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2xs',
              p: 'xs',
              border: '1px solid',
              borderColor: 'brand.blue',
              _hover: {
                borderColor: 'primary.default',
              },
              _activeLink: {
                textColor: 'primary.300',
                borderColor: 'primary.300',
                fontWeight: 'semibold',
              },
            }}
          >
            <FiLogOut /> Salir
          </ChakraLink>
        </Flex>
        <IconButton
          aria-label="Open menu"
          icon={menuIcon}
          size="md"
          sx={{
            display: { base: 'flex', lg: 'none' },
            bg: 'none',
            _hover: {
              bg: 'secondary.100',
            },
          }}
          onClick={toggleMenu}
        />
      </Flex>
      <AnimatePresence>
        {isOpen ? (
          <MotionVStack
            initial={{ height: 1, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.2 },
              opacity: { duration: 0.2 },
            }}
            sx={{
              display: { base: 'flex', lg: 'none' },
              alignItems: 'center',
              overflow: 'hidden',
              gap: 'md',
              py: 'sm',
            }}
          >
            {NAV_LINKS.map((link) => (
              <ChakraLink
                key={link.path}
                as={RouterLink}
                to={link.path}
                sx={{
                  _activeLink: {
                    textColor: 'primary.300',
                    fontWeight: 'semibold',
                  },
                }}
              >
                {link.name}
              </ChakraLink>
            ))}
            <ChakraLink
              as={RouterLink}
              to="/inicio-sesion"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '2xs',
                p: 'xs',
                border: '1px solid',
                borderColor: 'brand.blue',
                _hover: {
                  borderColor: 'primary.default',
                },
                _activeLink: {
                  textColor: 'primary.300',
                  borderColor: 'primary.300',
                  fontWeight: 'semibold',
                },
              }}
            >
              <FiLogIn /> Ingresar
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/admin"
              onClick={() => signOut(auth)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '2xs',
                p: 'xs',
                border: '1px solid',
                borderColor: 'brand.blue',
                _hover: {
                  borderColor: 'primary.default',
                },
                _activeLink: {
                  textColor: 'primary.300',
                  borderColor: 'primary.300',
                  fontWeight: 'semibold',
                },
              }}
            >
              <FiLogOut /> Salir
            </ChakraLink>
          </MotionVStack>
        ) : null}
      </AnimatePresence>
    </Box>
  );
};
