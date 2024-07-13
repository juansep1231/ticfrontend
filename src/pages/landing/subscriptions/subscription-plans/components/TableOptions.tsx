import { useState } from 'react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { SubscriptionPlan } from '../../../../../types/subscription-models';

import { AddSubscriptionPlanrModal } from './AddSubscriptionPlanModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  plans: SubscriptionPlan[];
  searchPlan: string;
  onSearchPlanChange: (name: string) => void;
  onAddSubscriptionPlan: (plan: SubscriptionPlan) => void;
}

export const TableOptions = ({
  plans,
  searchPlan,
  onSearchPlanChange,
  onAddSubscriptionPlan,
}: TableOptionsProps) => {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  return (
    <Flex
      sx={{
        flexDirection: { sm: 'column', lg: 'row' },
        gap: 'md',
        justifyContent: 'space-between',
      }}
    >
      <InputGroup sx={{ width: { sm: '100%', lg: 'md' } }}>
        <InputLeftElement>
          <SearchIcon sx={{ color: 'text.default' }} />
        </InputLeftElement>
        <Input
          value={searchPlan}
          placeholder="Buscar un plan de suscripción"
          onChange={(e) => onSearchPlanChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddPlanModalOpen(true)}
        >
          Plan
        </Button>
        <ButtonExcel data={plans} />
      </Flex>

      <AddSubscriptionPlanrModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setIsAddPlanModalOpen(false)}
        onAddSubscriptionPlan={onAddSubscriptionPlan}
      />
    </Flex>
  );
};
