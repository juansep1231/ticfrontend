import { useState } from 'react';
import { Heading, Flex, Link, Text } from '@chakra-ui/react';

import { Subscriber } from '../../../../types/subscription-models';

import { SubscribersTable } from './components/SubscribersTable';
import { EditSubscriberModal } from './components/EditSubscriberModal';

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
  const [subscribers, setSubscribers] =
    useState<Subscriber[]>(initialSubscribers);

  const handleEditMovement = (data: { subscriber: Subscriber }) => {
    console.log('Movimiento de inventario actualizado:', data.subscriber);
  };

  const handleDeleteMovement = (id: number | undefined) => {
    setSubscribers(subscribers.filter((event) => event.id !== id));
    console.log('Movimiento de transacción eliminado:', id);
  };

  const openEditMovementModal = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setEditSubscriberModalOpen(true);
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
        subscribers={subscribers}
        onEdit={openEditMovementModal}
        onDelete={handleDeleteMovement}
        error={null}
        isLoading={false}
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
