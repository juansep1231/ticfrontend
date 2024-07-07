import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

interface TableOptionsProps {
  searchTransaction: string;
  onSearchTransactionChange: (name: string) => void;
}

export const TableOptions = ({
  searchTransaction: searchTransaction,
  onSearchTransactionChange: onSearchTransactionChange,
}: TableOptionsProps) => {
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
          value={searchTransaction}
          placeholder="Buscar una transacción"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => console.log('Añadir transacción')}
        >
          Transacción
        </Button>
        <Button
          leftIcon={<DownloadIcon />}
          onClick={() => console.log('Descargar')}
        >
          Excel
        </Button>
      </Flex>
    </Flex>
  );
};
