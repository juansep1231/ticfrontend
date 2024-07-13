import { Heading, Flex, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { BudgetRequest } from '../../../../types/event-models';
import useFetchFinantialRequests from '../../../../hooks/Events/fetchFinantialRequestHook';
import useUpdateFinantialRequest, {
  CreateUpdateFinantialRequestDTO,
} from '../../../../hooks/Events/updateFinancialRequestHook';

import { EditBudgetRequestModal } from './components/EditBudgetRequestModal';
import { BudgetRequestTable } from './components/BudgetRequestTable';
/*
export const fakeBudgetRequests: BudgetRequest[] = [
  {
    id: 1,
    eventName: 'Annual Science Conference',
    requestStatusName: 'EN REVISION',
    reason: 'Necesitamos fondos para alquilar el lugar y comprar suministros.',
    value: 5000
  },
  {
    id: 2,
    eventName: 'Tech Expo 2024',
    requestStatusName: 'APROBADO',
    reason: 'Cubrir los costos de los stands y material promocional.',
    value: 3000
  },
  {
    id: 3,
    eventName: 'Math Olympiad',
    requestStatusName: 'RECHAZADO',
    reason: 'Gastos de transporte y alojamiento para los participantes.',
    value: 2000
  },
  {
    id: 4,
    eventName: 'History Symposium',
    requestStatusName: 'EN REVISION',
    reason: 'Honorarios para los ponentes y alquiler del auditorio.',
    value: 4500
  },
  {
    id: 5,
    eventName: 'Art Workshop Series',
    requestStatusName: 'APROBADO',
    reason: 'Compra de materiales y alquiler del espacio.',
    value: 1500
  }
];
*/

export const BudgetRequestPage = () => {
  const [isEditBudgetRequestModalOpen, setEditBudgetRequestModalOpen] =
    useState(false);
  const [selectedBudgetRequest, setSelectedBudgetRequest] =
    useState<BudgetRequest | null>(null);
  const [searchBudgetRequest, setSearchBudgetRequest] = useState('');

  /*const { updateEvent, updateError } = useUpdateEvent();
  const handleEditEvent = async (data: { event: EventView }) => {
    try {
      const formattedDate = formatISO(new Date(data.event.startDate));
      const formattedDate2 = formatISO(new Date(data.event.endDate));
      const updatedInfo: CreateUpdateEventDTO = {
        title: data.event.title,
        status: data.event.status,
        description: data.event.description,
        startDate: formattedDate,
        endDate: formattedDate2,
        budget: data.event.budget,
        budgetStatus: data.event.budgetStatus,
        location: data.event.location,
        income: data.event.income,
      };

      await updateEvent(data.event.id!, updatedInfo);

      updateEventState(data.event.id!, { ...data.event, ...updatedInfo });

      console.log('Updated event information:', data.event);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const { events, isLoadingEvents, eventErrors, updateEventState } =
  useFetchEvents();*/

  const {
    finantialRequests,
    isLoadingFinantialRequests,
    finantialRequestErrors,
    updateFinantialRequestState,
  } = useFetchFinantialRequests();
  const { updateFinantialRequest } = useUpdateFinantialRequest();
  const handleEditBudgetRequest = async (data: { request: BudgetRequest }) => {
    try {
      const updatedInfo: CreateUpdateFinantialRequestDTO = {
        eventName: data.request.eventName,
        reason: data.request.reason,
        requestStatusName: data.request.requestStatusName,
        value: data.request.value,
      };

      await updateFinantialRequest(data.request.id!, updatedInfo);

      updateFinantialRequestState(data.request.id!, {
        ...data.request,
        ...updatedInfo,
      });

      console.log('Updated event information:', data.request);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteBudgetRequest = (id: number | undefined) => {
    //events.filter((event) => event.id !== id);
    console.log('Solicitud eliminada:', id);
  };

  const openEditBudgetRequestModal = (request: BudgetRequest) => {
    setSelectedBudgetRequest(request);
    setEditBudgetRequestModalOpen(true);
  };

  const handleSearchBudgetRequestChange = (name: string) => {
    setSearchBudgetRequest(name);
  };

  const handleAddBudgetRequest = async (newRequest: BudgetRequest) => {
    return console.log('Añadir solicitud: ', newRequest);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Solicitud de Presupuesto</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Antes de añadir una solicitud de presupesto, asegúrate de que los
        eventos ya se encuentren registrados. En caso de no estar seguro revisa
        los
        <Link
          href="/eventos/solicitud-presupuesto"
          sx={{ color: 'brand.blue', ml: '3xs' }}
        >
          eventos disponibles.
        </Link>
      </Text>
      <BudgetRequestTable
        budgetRequests={finantialRequests}
        onEdit={openEditBudgetRequestModal}
        onDelete={handleDeleteBudgetRequest}
        error={finantialRequestErrors}
        isLoading={isLoadingFinantialRequests}
        searchRequest={searchBudgetRequest}
        onSearchRequestChange={handleSearchBudgetRequestChange}
        onAddBudgetRequest={handleAddBudgetRequest}
      />

      <EditBudgetRequestModal
        isOpen={isEditBudgetRequestModalOpen}
        onClose={() => setEditBudgetRequestModalOpen(false)}
        budget={selectedBudgetRequest}
        onSubmit={handleEditBudgetRequest}
      />
    </Flex>
  );
};
