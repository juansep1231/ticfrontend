import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { EventView } from '../../../../types/event-models';
import { formatISO } from 'date-fns';
import usePostEventWithFinancialRequest, { CreateUpdateEventDTO } from '../../../../hooks/Events/createEventHook';
import useFetchEvents from '../../../../hooks/Events/fetchEventHook';

import { AddEventModal } from './AddEventModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  events: EventView[];
  searchEvent: string;
  onSearchEventChange: (name: string) => void;
}

export const TableOptions = ({
  events,
  searchEvent,
  onSearchEventChange,
}: TableOptionsProps) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const { postEvent, postEventError }= usePostEventWithFinancialRequest();
  const {
    addEventState
  }= useFetchEvents();

  const handleAddEvent = async(newEvent: EventView) => {
    try {
      const formattedDate = formatISO(new Date(newEvent.startDate));
      const formattedDate2 = formatISO(new Date(newEvent.endDate));
      const updatedInfo: CreateUpdateEventDTO = {
        title: newEvent.title,
        status: newEvent.status,
        description: newEvent.description,
        startDate: formattedDate,
        endDate: formattedDate2,
        budget: newEvent.budget,
        budgetStatus: newEvent.budgetStatus,
        location: newEvent.location,
        income: newEvent.income,

      };
      const newAdminMember = await postEvent(updatedInfo);

      addEventState(newAdminMember);
   
    } catch (error) {
      console.error('Failed to update Event:', error);
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
          placeholder="Buscar un evento"
          value={searchEvent}
          onChange={(e) => onSearchEventChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddEventModalOpen(true)}
        >
          Evento
        </Button>
        <ButtonExcel data={events} />
      </Flex>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </Flex>
  );
};
