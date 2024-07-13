import { useState } from 'react';
import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { BudgetRequest } from '../../../../../types/event-models';

import { AddBudgetRequestModal } from './AddBudgetRequestModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  requests: BudgetRequest[];
  searchBudgetRequest: string;
  onSearchBudgetRequestChange: (name: string) => void;
}

export const TableOptions = ({
  requests,
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
          Solicitud
        </Button>
        <ButtonExcel data={requests} />
      </Flex>

      <AddBudgetRequestModal
        isOpen={isAddBudgetRequestModalOpen}
        onClose={() => setIsAddBudgetRequestModalOpen(false)}
        onAddBudgetRequest={handleAddBudgetRequest}
      />
    </Flex>
  );
};
