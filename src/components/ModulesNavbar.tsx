import React, { useState } from 'react';
import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  IconButton,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULES_NAVLINK, DROPDOWN_MENUS } from '../utils/constants';

const MotionVStack = motion(VStack);

export const ModulesNavbar = () => {
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
    <Flex
      sx={{
        rounded: 'md',
        alignItems: 'center',
        gap: 'md',
        p: 'xs',
      }}
    >
      <HamburgerIcon sx={{ color: 'black' }} />
      <Text sx={{ color: 'text.500', fontWeight: 'normal' }}>Módulos</Text>
    </Flex>
  );

  return (
    <Box
      sx={{
        boxShadow: 'lg',
        px: { sm: 'xs', lg: '3xl' },
        py: 'sm',
        a: {
          px: 'xs',
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
        <Flex
          sx={{
            display: { base: 'none', lg: 'flex' },
            gap: 'xl',
          }}
        >
          {DROPDOWN_MENUS.map((menu) => (
            <Menu key={menu.name}>
              <MenuButton
                as={ChakraLink}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {menu.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                {menu.items.map((item) => (
                  <MenuItem
                    key={item.path}
                    as={RouterLink}
                    to={item.path}
                    sx={{ textAlign: 'center' }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
          {MODULES_NAVLINK.map((module) => (
            <ChakraLink
              key={module.path}
              as={RouterLink}
              to={module.path}
              sx={{
                _activeLink: {
                  textColor: 'primary.300',
                  fontWeight: 'semibold',
                },
              }}
            >
              {module.name}
            </ChakraLink>
          ))}
        </Flex>
        <IconButton
          aria-label="Open menu"
          icon={menuIcon}
          size="md"
          sx={{
            display: { base: 'flex', lg: 'none' },
            color: 'text.default',
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
            {DROPDOWN_MENUS.map((menu) => (
              <Menu key={menu.name}>
                <MenuButton
                  as={ChakraLink}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {menu.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  {menu.items.map((item) => (
                    <MenuItem key={item.path} as={RouterLink} to={item.path}>
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ))}
            {MODULES_NAVLINK.map((module) => (
              <ChakraLink
                key={module.path}
                as={RouterLink}
                to={module.path}
                sx={{
                  _activeLink: {
                    textColor: 'primary.300',
                    fontWeight: 'semibold',
                  },
                }}
              >
                {module.name}
              </ChakraLink>
            ))}
          </MotionVStack>
        ) : null}
      </AnimatePresence>
    </Box>
  );
};
