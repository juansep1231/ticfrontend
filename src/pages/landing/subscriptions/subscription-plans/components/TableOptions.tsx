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
import { CreateUpdateContributionPlanDTO } from '../../../../../hooks/organizational/updateContributorPlan';
import usePostContributionPlan from '../../../../../hooks/organizational/createContributionPlan';
import useFetchContributionPlans from '../../../../../hooks/organizational/fetchContributionPlan';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  plans: SubscriptionPlan[];
  searchPlan: string;
  onSearchPlanChange: (name: string) => void;
}

export const TableOptions = ({
  plans,
  searchPlan,
  onSearchPlanChange,
}: TableOptionsProps) => {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const { postContributionPlan } = usePostContributionPlan();
  const {addContributionPlanState} = useFetchContributionPlans();
  const handleAddPlan = async (newPlan: SubscriptionPlan) => {
    
    try {
      const newContributionPlan: CreateUpdateContributionPlanDTO = {
        planName: newPlan.planName,
        price: newPlan.price,
        benefits: newPlan.benefits,
        academic_Period_Name: newPlan.academicPeriod,


      };
      const newAdminMember = await postContributionPlan(newContributionPlan);

      addContributionPlanState(newAdminMember);
   
    } catch (error) {
      console.error('Failed to update association:', error);
    }
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
        <ButtonExcel data={plans} />
      </Flex>

      <AddSubscriptionPlanrModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setIsAddPlanModalOpen(false)}
        onAddSubscriptionPlan={handleAddPlan}
      />
    </Flex>
  );
};
