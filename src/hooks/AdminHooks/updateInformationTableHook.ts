import { useState } from 'react';

export interface CreateUpdateAssociationDTO {
  mission: string;
  vision: string;
}

const useUpdateAssociation = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateAssociation = async (id: number, updatedAssociation: CreateUpdateAssociationDTO) => {
    setUpdateError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ASSOCIATIONS_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssociation),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log("actualizado correctaemnte");
        return; 
      }
     

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update association:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateAssociation,updateError };
};

export default useUpdateAssociation;
