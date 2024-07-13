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
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  subscribers: Subscriber[];
  searchSubscriber: string;
  onSearchSubscriberChange: (name: string) => void;
}

export const TableOptions = ({
  subscribers,
  searchSubscriber,
  onSearchSubscriberChange,
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
          value={searchSubscriber}
          placeholder="Buscar un aportante"
          onChange={(e) => onSearchSubscriberChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddSubscriberModalOpen(true)}
        >
          Aportante
        </Button>
        <ButtonExcel data={subscribers} />
      </Flex>

      <AddSubscriberModal
        isOpen={isAddSubscriberModalOpen}
        onClose={() => setIsAddSubscriberModalOpen(false)}
        onAddSubscriber={handleAddSubscriber}
      />
    </Flex>
  );
};
