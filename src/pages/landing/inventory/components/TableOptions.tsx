import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

interface TableOptionsProps {
  searchMovement: string;
  onSearchMovementChange: (name: string) => void;
}

export const TableOptions = ({
  searchMovement: searchMovement,
  onSearchMovementChange: onSearchMovementChange,
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
          value={searchMovement}
          placeholder="Buscar un movimiento de inventario"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => console.log('Añadir movimiento de inventario')}
        >
          Movimiento
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
