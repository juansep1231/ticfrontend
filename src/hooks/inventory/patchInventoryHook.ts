import { useState } from 'react';

const usePatchInventoryMovementState = () => {
  const [patchError, setPatchError] = useState<string | null>(null);

  const patchInventoryMovementState = async (id: number) => {
    setPatchError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_INVENTORY_MOVEMENTS_ENDPOINT}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 204) {
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to patch inventory movement state:', error);
      setPatchError(error.message);
      throw error;
    }
  };

  return { patchInventoryMovementState, patchError };
};

export default usePatchInventoryMovementState;
