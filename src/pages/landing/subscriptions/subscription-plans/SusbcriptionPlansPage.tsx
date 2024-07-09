import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { SubscriptionPlansTable } from './components/SubscribtionPlansTable';
import { useState } from 'react';
import { SubscriptionPlan } from '../../../../types/subscription-models';
import { EditSubscriptionPlanrModal } from './components/EditSubscriptionPlanModal';

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
  const [transactions, setTransactions] = useState<SubscriptionPlan[]>(
    initialSubscriptionPlans
  );

  const handleEditTransaction = (data: { plan: SubscriptionPlan }) => {
    console.log('Plan actualizado:', data.plan);
  };

  const handleDeleteTransaction = (id: number | undefined) => {
    setTransactions(transactions.filter((event) => event.id !== id));
    console.log('Transacción eliminado:', id);
  };

  const openEditTransactionModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setEditPlanModalOpen(true);
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
        plans={transactions}
        onEdit={openEditTransactionModal}
        onDelete={handleDeleteTransaction}
        error={null}
        isLoading={false}
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
