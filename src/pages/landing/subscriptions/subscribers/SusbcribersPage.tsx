import { useState } from 'react';
import { Heading, Flex, Link, Text } from '@chakra-ui/react';

import { Subscriber } from '../../../../types/subscription-models';

import { SubscribersTable } from './components/SubscribersTable';
import { EditSubscriberModal } from './components/EditSubscriberModal';
import { useFetchContributors } from '../../../../hooks/organizational/fetchContributorHook';
import useUpdateContributor, {
  CreateUpdateContributorDTO,
} from '../../../../hooks/organizational/updateContributor';
import { format, formatISO, parseISO } from 'date-fns';
import usePatchContributorState from '../../../../hooks/organizational/patchContributorHook';

export const initialSubscribers: Subscriber[] = [
  {
    id: 1,
    date: '2024-01-01',
    name: 'Juan Perez',
    faculty: 'Engineering',
    career: 'Computer Science',
    email: 'juan.perez@example.com',
    plan: 'Basic',
    price: '$10',
  },
  {
    id: 2,
    date: '2024-02-15',
    name: 'Maria Gomez',
    faculty: 'Business',
    career: 'Marketing',
    email: 'maria.gomez@example.com',
    plan: 'Premium',
    price: '$25',
  },
  {
    id: 3,
    date: '2024-03-22',
    name: 'Carlos Ramirez',
    faculty: 'Humanities',
    career: 'History',
    email: 'carlos.ramirez@example.com',
    plan: 'Standard',
    price: '$15',
  },
  {
    id: 4,
    date: '2024-04-18',
    name: 'Ana Martinez',
    faculty: 'Medicine',
    career: 'Nursing',
    email: 'ana.martinez@example.com',
    plan: 'Basic',
    price: '$10',
  },
  {
    id: 5,
    date: '2024-05-30',
    name: 'Luis Hernandez',
    faculty: 'Law',
    career: 'Law',
    email: 'luis.hernandez@example.com',
    plan: 'Premium',
    price: '$25',
  },
];

export const SubscribersPage = () => {
  const [isEditSubscriberModalOpen, setEditSubscriberModalOpen] =
    useState(false);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const { updateContributor, updateError } = useUpdateContributor();
  const [searchSubscriber, setSearchSubscriber] = useState('');

  const {
    contributors,
    isLoadingContributors,
    contributorErrors,
    updateContributorState,
  } = useFetchContributors();

  const { patchContributorState, patchError } = usePatchContributorState();
  const handleEditMovement = async (data: { subscriber: Subscriber }) => {
    try {
      const formattedDate = formatISO(new Date(data.subscriber.date));
      const updatedInfo: CreateUpdateContributorDTO = {
        date: formattedDate,
        name: data.subscriber.name,
        faculty: data.subscriber.faculty,
        career: data.subscriber.career,
        email: data.subscriber.email,
        plan: data.subscriber.plan,
        price: data.subscriber.price,
      };

      await updateContributor(data.subscriber.id!, updatedInfo);


      const originalFormattedDate = format(parseISO(data.subscriber.date), 'dd/MM/yyyy');

      updateContributorState(data.subscriber.id!, {
        ...data.subscriber,
        ...updatedInfo,
        date: originalFormattedDate,
      });

      console.log('Updated organizational information:', data.subscriber);
    } catch (error) {
      console.error('Failed to update association:', error);
    }
  };

  const handleDeleteMovement = async (id: number | undefined) => {
    try {
      await patchContributorState(id!);
      updateContributorState(id!, { state_id: 2 });
      console.log('Aportante eliminado:', id);
    } catch (error) {
      console.error('Failed to update association state:', error);
    }
  };

  const openEditMovementModal = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setEditSubscriberModalOpen(true);
  };

  const handleSearchSubscriberChange = (name: string) => {
    setSearchSubscriber(name);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Aportantes</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir un aportante, asegúrate de que los planes de suscripción
        ya se encuentren registrados. En caso de no estar seguro revisa los
        <Link
          href="/aportaciones/planes-aportacion"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          planes de aportación disponibles.
        </Link>
      </Text>
      <SubscribersTable
        subscribers={contributors}
        onEdit={openEditMovementModal}
        onDelete={handleDeleteMovement}
        error={contributorErrors}
        isLoading={isLoadingContributors}
        searchSubscriber={searchSubscriber}
        onSearchSubscriberChange={handleSearchSubscriberChange}
      />

      <EditSubscriberModal
        isOpen={isEditSubscriberModalOpen}
        onClose={() => setEditSubscriberModalOpen(false)}
        subscriber={selectedSubscriber}
        onSubmit={handleEditMovement}
      />
    </Flex>
  );
};
