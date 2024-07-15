import { Flex, Heading, Text } from '@chakra-ui/react';
import useFetchAssociations from '../../../hooks/admin/fetchInformationTableHook';

export const MisionVisionCard = () => {

  const { associations} = useFetchAssociations();

  return (
    <Flex sx={{ gap: '3xl', width: '100%' }}>
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 'sm',
          width: '50%'
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
          {associations[0]?.mission}
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
        {associations[0]?.vision}
        </Text>
      </Flex>
    </Flex>
  );
};
