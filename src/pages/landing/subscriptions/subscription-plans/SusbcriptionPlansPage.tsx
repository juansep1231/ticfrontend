import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { SubscriptionPlansTable } from './components/SubscribtionPlansTable';
import { useState } from 'react';
import { SubscriptionPlan } from '../../../../types/subscription-models';
import { EditSubscriptionPlanrModal } from './components/EditSubscriptionPlanModal';
import { useFetchContributionPlans } from '../../../../hooks/organizational/fetchContributionPlan';
import {
  CreateUpdateContributionPlanDTO,
  useUpdateContributionPlan,
} from '../../../../hooks/organizational/updateContributorPlan';
import usePatchContributionPlanState from '../../../../hooks/organizational/patchContributionPlanHook';

export const initialSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    planName: 'Basic',
    price: 10,
    benefits: 'Access to basic resources, Monthly newsletter, Limited support',
    academicPeriod: '2024-2025',
  },
  {
    id: 2,
    planName: 'Standard',
    price: 15,
    benefits:
      'Access to all resources, Monthly newsletter, Priority support, Access to special events',
    academicPeriod: '2024-2025',
  },
  {
    id: 3,
    planName: 'Premium',
    price: 25,
    benefits:
      'All Standard benefits, 1-on-1 mentorship, Exclusive workshops, Free entry to all events',
    academicPeriod: '2024-2025',
  },
  {
    id: 4,
    planName: 'Basic',
    price: 10,
    benefits: 'Access to basic resources, Monthly newsletter, Limited support',
    academicPeriod: '2025-2026',
  },
  {
    id: 5,
    planName: 'Standard',
    price: 15,
    benefits:
      'Access to all resources, Monthly newsletter, Priority support, Access to special events',
    academicPeriod: '2025-2026',
  },
  {
    id: 6,
    planName: 'Premium',
    price: 25,
    benefits:
      'All Standard benefits, 1-on-1 mentorship, Exclusive workshops, Free entry to all events',
    academicPeriod: '2025-2026',
  },
];

export const SubscriptionPlansPage = () => {
  const [isEditPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );

  const [searchPlan, setSearchPlan] = useState('');

  const {
    contributionPlans,
    isLoadingContributionPlans,
    contributionPlanErrors,
    updateContributionPlanState,
  } = useFetchContributionPlans();
  const { updateContributionPlan, updateError } = useUpdateContributionPlan();
  const { patchContributionPlanState, patchError } =
    usePatchContributionPlanState();
  const handleEditTransaction = async (data: { plan: SubscriptionPlan }) => {
    try {
      const updatedInfo: CreateUpdateContributionPlanDTO = {
        planName: data.plan.planName,
        price: data.plan.price,
        benefits: data.plan.benefits,
        academic_Period_Name: data.plan.academicPeriod,
      };

      await updateContributionPlan(data.plan.id!, updatedInfo);

      // Assuming updateContributionPlanState is a function to update the local state
      updateContributionPlanState(data.plan.id!, {
        ...data.plan,
        ...updatedInfo,
      });

      console.log('Updated contribution plan information:', data.plan);
    } catch (error) {
      console.error('Failed to update contribution plan:', error);
    }
  };

  const handleDeleteTransaction = async (id: number | undefined) => {
    try {
      await patchContributionPlanState(id!);
      updateContributionPlanState(id!, { state_id: 2 });
      console.log('Plan de aportacion eliminado:', id);
    } catch (error) {
      console.error(
        'Falla al actualizar el esatdo del plan de aportacion:',
        error
      );
    }
  };

  const openEditTransactionModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setEditPlanModalOpen(true);
  };

  const handleSearchEventChange = (name: string) => {
    setSearchPlan(name);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Planes de Aportación</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Una vez que añadiste los planes de aportación necesarios, ya puedes
        <Link
          href="/aportaciones/aportantes"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          registrar a tus aportantes.
        </Link>
      </Text>
      <SubscriptionPlansTable
        plans={contributionPlans}
        onEdit={openEditTransactionModal}
        onDelete={handleDeleteTransaction}
        error={null}
        isLoading={false}
        searchPlan={searchPlan}
        onSearchPlanChange={handleSearchEventChange}
      />

      <EditSubscriptionPlanrModal
        isOpen={isEditPlanModalOpen}
        onClose={() => setEditPlanModalOpen(false)}
        plan={selectedPlan}
        onSubmit={handleEditTransaction}
      />
    </Flex>
  );
};
