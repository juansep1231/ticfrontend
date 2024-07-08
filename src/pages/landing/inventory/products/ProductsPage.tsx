import { Heading, Flex, Text, Link } from '@chakra-ui/react';
import { ProductsTable } from './components/ProductsTable';
import { useState } from 'react';
import { Product } from '../../../../types/inventory-models';
import { EditProductModal } from './components/EditProducModal';

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    description: 'A high-performance laptop with 16GB RAM and 512GB SSD.',
    price: 1200,
    quantity: 10,
    label: 'High-end',
    provider: 'TechSupplier Inc.',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Accessories',
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    price: 25,
    quantity: 50,
    label: 'Popular',
    provider: 'Accessories Co.',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    description: 'Mechanical keyboard with RGB lighting and programmable keys.',
    price: 75,
    quantity: 30,
    label: 'Top Seller',
    provider: 'Keyboards R Us',
  },
  {
    id: 4,
    name: '27-inch Monitor',
    category: 'Electronics',
    description:
      'Ultra HD 4K monitor with adjustable stand and multiple ports.',
    price: 350,
    quantity: 15,
    label: 'New Arrival',
    provider: 'Screens & Displays',
  },
];

export const ProductsPage = () => {
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleEditProduct = (data: { product: Product }) => {
    console.log('Producto actualizado:', data.product);
  };

  const handleDeleteProduct = (id: number | undefined) => {
    setProducts(products.filter((event) => event.id !== id));
    console.log('Producto eliminado:', id);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setEditProductModalOpen(true);
  };

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Productos</Heading>
      <Text sx={{ color: 'text.default', textAlign: 'justify' }}>
        Ahora que añadiste los productos necesarios, no olvides
        <Link href="/proveedores" sx={{ color: 'brand.blue', mx: '3xs' }}>
          registrar tus proveedores
        </Link>
        previo a
        <Link href="/inventario" sx={{ color: 'brand.blue', ml: '3xs' }}>
          añadir tus movimientos de inventario.
        </Link>
      </Text>
      <ProductsTable
        products={products}
        onEdit={openEditProductModal}
        onDelete={handleDeleteProduct}
      />

      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => setEditProductModalOpen(false)}
        product={selectedProduct}
        onSubmit={handleEditProduct}
      />
    </Flex>
  );
};
