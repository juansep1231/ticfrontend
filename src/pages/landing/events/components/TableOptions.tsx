import { useState } from 'react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { EventView } from '../../../../types/event-models';

import { AddEventModal } from './AddEventModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  events: EventView[];
  searchEvent: string;
  onSearchEventChange: (name: string) => void;
  onAddEvent: (event: EventView) => void;
}

export const TableOptions = ({
  events,
  searchEvent,
  onSearchEventChange,
  onAddEvent,
}: TableOptionsProps) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

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
        onAddEvent={onAddEvent}
      />
    </Flex>
  );
};
