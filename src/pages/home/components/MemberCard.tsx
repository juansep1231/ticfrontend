import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { MyIcon } from '../../../components/MyIcon';
import { HomeMember } from '../../../types/organizational-models';

interface MemberProps {
  member: HomeMember;
}

export const MemberCard = ({ member }: MemberProps) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        boxShadow: 'md',
        w: { sm: '100%', md: '48%', xl: '23%' },
        p: 'md',
      }}
    >
      <Flex
        sx={{ flexDirection: 'column', gap: 'sm', textColor: 'text.default' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Text
            sx={{
              fontSize: 'text.lg',
              fontWeight: 'semibold',
              textColor: 'black',
            }}
          >
            {member.name}
          </Text>
          <Text>{member.position}</Text>
          <Text color="gray.500">{member.semester}</Text>
        </Box>
        <Heading sx={{ textColor: 'black', fontSize: 'text.lg' }}>
          Contacto
        </Heading>
        <Flex sx={{ gap: 'xs' }}>
          <Box
            sx={{
              bg: 'brand.blue',
              p: '3xs',
              rounded: 'md',
              color: 'white',
            }}
          >
            <MyIcon icon="FiMail" size={14} />
          </Box>
          <Text sx={{ textColor: 'text.default' }}>{member.email}</Text>
        </Flex>
        <Flex sx={{ gap: 'sm' }}>
          <Box
            sx={{
              bg: 'brand.blue',
              p: '3xs',
              rounded: 'md',
              color: 'white',
            }}
          >
            <MyIcon icon="FiPhone" size={14} />
          </Box>
          <Text sx={{ textColor: 'text.default' }}>{member.telf}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
