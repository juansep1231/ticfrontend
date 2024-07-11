import { useState } from 'react';

export interface CreateUpdateAssociationDTO {
  mission: string;
  vision: string;
}

const usePostAssociation = () => {
  const [postError, setPostError] = useState<string | null>(null);

  const postAssociation = async (newAssociation: CreateUpdateAssociationDTO) => {
    setPostError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ASSOCIATIONS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssociation),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 201) {
        const createdAssociation = await response.json();
        return createdAssociation;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to create association:', error);
      setPostError(error.message);
      throw error;
    }
  };

  return { postAssociation, postError };
};

export default usePostAssociation;
