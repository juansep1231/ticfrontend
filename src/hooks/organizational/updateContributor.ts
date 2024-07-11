import { useState } from 'react';

export interface CreateUpdateContributorDTO {
  date: string; // Using string for simplicity, consider using a date library for better handling
  name: string;
  faculty: string;
  career: string;
  email: string;
  plan: string;
  price: string;
}

const useUpdateContributor = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateContributor = async (
    id: number,
    updatedContributor: CreateUpdateContributorDTO
  ) => {
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTRIBUTORS_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedContributor),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log('Contribuyente actualizado correctamente');
        return;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update contributor:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateContributor, updateError };
};

export default useUpdateContributor;
