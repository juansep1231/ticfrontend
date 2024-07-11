import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { SubscriptionPlan } from '../../../../../types/subscription-models';

import { AddSubscriptionPlanrModal } from './AddSubscriptionPlanModal';

interface TableOptionsProps {
  searchPlan: string;
  onSearchPlanChange: (name: string) => void;
}

export const TableOptions = ({
  searchPlan,
  onSearchPlanChange,
}: TableOptionsProps) => {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);

  const handleAddPlan = (newPlan: SubscriptionPlan) => {
    console.log('Plan de aportación agregado:', newPlan);
  };

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
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddSubscriptionPlanrModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setIsAddPlanModalOpen(false)}
        onAddSubscriptionPlan={handleAddPlan}
      />
    </Flex>
  );
};
