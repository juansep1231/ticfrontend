import { Flex, Heading, Text } from '@chakra-ui/react';

export const MisionVisionCard = () => {
  return (
    <Flex sx={{ gap: '3xl', width: '100%' }}>
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 'sm',
        }}
      >
        <Heading
          sx={{
            fontSize: 'heading.desktop.subtitle',
          }}
        >
          Misión
        </Heading>
        <Text sx={{ textColor: 'text.default', textAlign: 'justify' }}>
          ¡Bienvenidos al Sistema Cloud ERP de la FEPON! Gestiona tus
          actividades y recursos de manera eficiente con nuestra plataforma
          integral.
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 'sm',
          borderLeft: { sm: 'none', lg: '1px solid' },
          borderColor: { sm: 'none', lg: 'surface.default' },
          pl: { sm: 'none', lg: '3xl' },
        }}
      >
        <Heading
          sx={{
            fontSize: 'heading.desktop.subtitle',
          }}
        >
          Visión
        </Heading>
        <Text sx={{ textColor: 'text.default', textAlign: 'justify' }}>
          ¡Bienvenidos al Sistema Cloud ERP de la FEPON! Gestiona tus
          actividades y recursos de manera eficiente con nuestra plataforma
          integral.
        </Text>
      </Flex>
    </Flex>
  );
};
