import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Subscriber } from '../../../../../types/subscription-models';
import { AddSubscriberModal } from './AddSubscriberModal';

interface TableOptionsProps {
  searchSubscriber: string;
  onSearchSubscriberChange: (name: string) => void;
}

export const TableOptions = ({
  searchSubscriber: searchSubscriber,
  onSearchSubscriberChange: onSearchSubscriberChange,
}: TableOptionsProps) => {
  const [isAddSubscriberModalOpen, setIsAddSubscriberModalOpen] =
    useState(false);

  const handleAddSubscriber = (newSubscriber: Subscriber) => {
    console.log('Aportante agregado:', newSubscriber);
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
          type="text"
          value={searchSubscriber}
          placeholder="Buscar un aportante"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddSubscriberModalOpen(true)}
        >
          Aportante
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>

      <AddSubscriberModal
        isOpen={isAddSubscriberModalOpen}
        onClose={() => setIsAddSubscriberModalOpen(false)}
        onAddSubscriber={handleAddSubscriber}
      />
    </Flex>
  );
};
