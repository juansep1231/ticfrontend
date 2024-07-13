import { useState } from 'react';
import { CreateUpdateProductDTO } from './updateProductHook';
import { Product } from '../../types/inventory-models';


export const usePostProduct = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [postedProduct, setPostedProduct] = useState<Product | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PRODUCTS_ENDPOINT}`;

  const postProduct = async (productDTO: CreateUpdateProductDTO) => {
    setIsPosting(true);
    setPostError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data:Product  = await response.json();
      setPostedProduct(data);
      console.log('Posted product:', data);
    } catch (error: any) {
      if (error instanceof Error) {
        setPostError(error);
      } else {
        setPostError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  return { isPosting, postError, postedProduct, postProduct };
};

export default usePostProduct;
