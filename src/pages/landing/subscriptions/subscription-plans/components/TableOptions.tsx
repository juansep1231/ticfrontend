import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

interface TableOptionsProps {
  searchPlan: string;
  onSearchPlanChange: (name: string) => void;
}

export const TableOptions = ({
  searchPlan: searchPlan,
  onSearchPlanChange: onSearchPlanChange,
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
          value={searchPlan}
          placeholder="Buscar un plan de suscripción"
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => console.log('Añadir plan de suscripción')}
        >
          Plan
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
