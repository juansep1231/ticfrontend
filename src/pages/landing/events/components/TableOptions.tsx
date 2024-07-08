import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { AddEventModal } from './AddEventModal';
import { useState } from 'react';
import { EventView } from '../../../../types/event-models';

interface TableOptionsProps {
  searchEvent: string;
  onSearchEventChange: (name: string) => void;
}

export const TableOptions = ({
  searchEvent,
  onSearchEventChange,
}: TableOptionsProps) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  const handleAddEvent = (newEvent: EventView) => {
    console.log('Evento agregado:', newEvent);
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
        <Input type="text" value={searchEvent} placeholder="Buscar un evento" />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddEventModalOpen(true)}
        >
          Evento
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </Flex>
  );
};
