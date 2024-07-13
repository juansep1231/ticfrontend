import { useState } from 'react';
import { CreateUpdateInventoryMovementDTO } from './updateInventoryHook';


export const usePostInventoryMovement = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [postedInventoryMovement, setPostedInventoryMovement] = useState<CreateUpdateInventoryMovementDTO | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_INVENTORY_MOVEMENTS_ENDPOINT}`;

  const postInventoryMovement = async (inventoryMovementDTO: CreateUpdateInventoryMovementDTO) => {
    setIsPosting(true);
    setPostError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryMovementDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data: CreateUpdateInventoryMovementDTO = await response.json();
      setPostedInventoryMovement(data);
      console.log('Posted inventory movement:', data);
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

  return { isPosting, postError, postedInventoryMovement, postInventoryMovement };
};

export default usePostInventoryMovement;
