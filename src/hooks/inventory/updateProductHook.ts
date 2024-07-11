import { useState } from 'react';

export interface CreateUpdateProductDTO {
  name: string;
  description: string;
  price: number;
  quantity: number;
  label: string;
  category: string;
  provider: string;
}

const useUpdateProduct = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateProduct = async (
    id: number,
    updatedProduct: CreateUpdateProductDTO
  ) => {
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PRODUCTS_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log('Producto actualizado correctamente');
        return;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update product:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateProduct, updateError };
};

export default useUpdateProduct;
