import { Box, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';

import { MyIcon } from '../../../components/MyIcon';
import { Plan } from '../../../types/organizational-models';

interface SubscriptionPlanProps {
  plan: Plan;
}

export const SubscriptionPlanCard = ({ plan }: SubscriptionPlanProps) => {
  return (
    <Box
      sx={{
        boxShadow: 'md',
        border: '1px',
        borderColor: 'gray.200',
        rounded: 'md',
        p: 'md',
        w: { sm: '100%', md: '48%', xl: '32%' },
        h: 'auto',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          p: 'md',
          gap: 'md',
          alignItems: 'center',
        }}
      >
        <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
          {plan.title}
        </Heading>
        <Heading
          sx={{ fontSize: 'heading.desktop.2', textColor: 'brand.blue' }}
        >
          ${plan.price}
        </Heading>
        <Heading sx={{ fontSize: 'text.lg' }}>Incluye:</Heading>
        <List spacing="xs">
          {plan.benefits.map((benefit, index) => (
            <ListItem key={index}>
              <Flex sx={{ gap: 'md', alignItems: 'center' }}>
                <Box
                  sx={{
                    bg: 'brand.yellow',
                    color: 'white',
                    rounded: 'full',
                    p: '3xs',
                  }}
                >
                  <MyIcon icon="FiCheck" size={16} />
                </Box>
                <Text sx={{ textAlign: 'justify' }}>{benefit}</Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};
