import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { AddBudgetRequestModal } from './AddBudgetRequestModal';
import { useState } from 'react';
import { BudgetRequest } from '../../../../../types/event-models';

interface TableOptionsProps {
  searchBudgetRequest: string;
  onSearchBudgetRequestChange: (name: string) => void;
}

export const TableOptions = ({
  searchBudgetRequest,
  onSearchBudgetRequestChange,
}: TableOptionsProps) => {
  const [isAddBudgetRequestModalOpen, setIsAddBudgetRequestModalOpen] =
    useState(false);

  const handleAddBudgetRequest = (newRequest: BudgetRequest) => {
    console.log('Solicitud agregada:', newRequest);
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
          placeholder="Buscar uns solicitud de presupuesto"
          value={searchBudgetRequest}
          onChange={(e) => onSearchBudgetRequestChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddBudgetRequestModalOpen(true)}
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

      <AddBudgetRequestModal
        isOpen={isAddBudgetRequestModalOpen}
        onClose={() => setIsAddBudgetRequestModalOpen(false)}
        onAddBudgetRequest={handleAddBudgetRequest}
      />
    </Flex>
  );
};
