import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@chakra-ui/react';

import { getCurrentYear } from '../utils/date-helper';

export const Footer = () => {
  const iconColor = useTheme().colors.brand.blue;
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 'xs',
        px: { base: 'md', lg: '3xl' },
        py: 'xs',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'surface.default',
      }}
    >
      <Flex sx={{ flexDirection: 'column', textColor: 'text.300' }}>
        <Text>
          Federación de Estudiantes de la Escuela Politécnica Nacional
        </Text>
        <Text>Copyright © {getCurrentYear()}</Text>
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          gap: 'sm',
        }}
      >
        <IconButton
          as="a"
          href="https://www.facebook.com/fepon.epn"
          target="_blank"
          aria-label="Facebook"
          icon={
            <FontAwesomeIcon icon={faFacebook} style={{ color: iconColor }} />
          }
          variant="ghost"
          sx={{
            '&:hover': {
              bg: 'secondary.100',
            },
          }}
        />
        <IconButton
          as="a"
          href="https://www.instagram.com/fepon.epn/"
          target="_blank"
          aria-label="Instagram"
          icon={
            <FontAwesomeIcon icon={faInstagram} style={{ color: iconColor }} />
          }
          variant="ghost"
          sx={{
            '&:hover': {
              bg: 'secondary.100',
            },
          }}
        />
        <IconButton
          as="a"
          href="https://www.linkedin.com/company/fepon/"
          target="_blank"
          aria-label="LinkedIn"
          icon={
            <FontAwesomeIcon icon={faLinkedin} style={{ color: iconColor }} />
          }
          variant="ghost"
          sx={{
            '&:hover': {
              bg: 'secondary.100',
            },
          }}
        />
      </Flex>
    </Flex>
  );
};
