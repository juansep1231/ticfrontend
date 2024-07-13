import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Td,
  IconButton,
  Spinner,
  Center,
} from '@chakra-ui/react';

import { ConfirmationModal } from '../../../../../components/ConfirmationModal';
import { PRODUCTS_TABLE_HEADERS } from '../../../../../utils/constants';

import { TableOptions } from './TableOptions';
import { Product } from '../../../../../types/inventory-models';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { productsFilterByName } from '../../../../../utils/filter-helper';
import { useErrorToast } from '../../../../../hooks/general/useErrorToast';

interface ProductsTableProps {
  products: Product[];
  error: Error | null;
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number | undefined) => void;
  searchProduct: string;
  onSearchProductChange: (name: string) => void;
}

export const ProductsTable = ({
  products,
  error,
  isLoading,
  onEdit,
  onDelete,
  searchProduct,
  onSearchProductChange,
}: ProductsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredProducts(productsFilterByName(products, searchProduct));
  }, [products, searchProduct]);

  useErrorToast(error);

  const handleDeleteClick = (id: number | undefined) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId !== undefined) {
      onDelete(selectedProductId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <Center sx={{ width: '100vw' }}>
        <Spinner size="xl" sx={{ color: 'brand.blue' }} />
      </Center>
    );
  }

  return (
    <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
      <TableOptions
        products={filteredProducts}
        searchProduct={searchProduct}
        onSearchProductChange={onSearchProductChange}
      />
      <TableContainer>
        <Table
          variant="simple"
          sx={{
            'border': '1px solid',
            'borderColor': 'brand.blue',
            'borderCollapse': 'collapse',
            'width': '100%',
            'textColor': 'surface.default',
            'fontSize': 'text.md',
            '& th, & td': {
              textColor: 'text.default',
              fontSize: 'text.md',
              textAlign: 'center',
            },
            '& th': {
              bg: 'brand.blue',
              textColor: 'white',
              height: '58px',
            },
            '& td': {
              border: '1px solid',
              borderColor: 'brand.blue',
            },
          }}
        >
          <Thead>
            <Tr sx={{ textColor: 'surface.default' }}>
              <Th
                sx={{
                  borderRight: '1px',
                  width: '20',
                }}
              ></Th>
              {PRODUCTS_TABLE_HEADERS.map((header, index) => (
                <Th
                  key={index}
                  sx={{
                    borderRight: '1px',
                    borderColor: 'primary.100',
                  }}
                >
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts.length === 0 ? (
              <Tr>
                <Td colSpan={PRODUCTS_TABLE_HEADERS.length + 1}>
                  No olvides ingresar productos.
                </Td>
              </Tr>
            ) : (
              filteredProducts.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Flex
                      sx={{
                        gap: 'sm',
                        flexDirection: { sm: 'column', lg: 'row' },
                      }}
                    >
                      <IconButton
                        aria-label="Edit Product"
                        icon={<FaEdit size={16} />}
                        onClick={() => onEdit(product)}
                        size="sm"
                        sx={{
                          bg: 'none',
                          color: 'brand.blue',
                          _hover: {
                            bg: 'secondary.100',
                            color: 'primary.default',
                          },
                        }}
                      />
                      <IconButton
                        aria-label="Delete Product"
                        icon={<FaTrash size={16} />}
                        onClick={() => handleDeleteClick(product.id)}
                        size="sm"
                        sx={{
                          bg: 'none',
                          color: 'brand.blue',
                          _hover: {
                            bg: 'secondary.100',
                            color: 'primary.default',
                          },
                        }}
                      />
                    </Flex>
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{product.label}</Td>
                  <Td>{product.provider}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar producto"
        body="¿Estás seguro de que deseas eliminar este producto?"
      />
    </Flex>
  );
};
