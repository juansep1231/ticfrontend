import { useState } from 'react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Product } from '../../../../../types/inventory-models';

import { AddProductModal } from './AddProductModal';
import { ButtonExcel } from './ButtonExcel';

interface TableOptionsProps {
  products: Product[];
  searchProduct: string;
  onSearchProductChange: (name: string) => void;
  onAddProduct: (product: Product) => void;
}

export const TableOptions = ({
  products,
  searchProduct,
  onSearchProductChange,
  onAddProduct,
}: TableOptionsProps) => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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
          value={searchProduct}
          placeholder="Buscar un producto"
          onChange={(e) => onSearchProductChange(e.target.value)}
        />
      </InputGroup>
      <Flex sx={{ gap: 'sm' }}>
        <Button
          leftIcon={<AddIcon />}
          onClick={() => setIsAddProductModalOpen(true)}
        >
          Producto
        </Button>
        <ButtonExcel data={products} />
      </Flex>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </Flex>
  );
};
