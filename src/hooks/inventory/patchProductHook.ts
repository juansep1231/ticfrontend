import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';

const usePatchProductState = () => {
  const [patchError, setPatchError] = useState<string | null>(null);
  const { token } = useAuth();

  const patchProductState = async (id: number) => {
    setPatchError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PRODUCTS_ENDPOINT}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          mode: 'cors',
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
      console.error('Failed to patch product state:', error);
      setPatchError(error.message);
      throw error;
    }
  };

  return { patchProductState, patchError };
};

export default usePatchProductState;
