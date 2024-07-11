import { useState } from 'react';

export interface CreateUpdateAdministrativeMemberDTO {
    firstName: string;
    lastName: string;
    birthDate: string;
    cellphone: string;
    faculty: string;
    career: string;
    semester: string;
    email: string;
    position: string;
}

const useUpdateAdministrativeMember = () => {
  const [updateAdministrativeMemberError, setUpdateError] = useState<string | null>(null);

  const updateAdministrativeMember = async (
    id: number,
    updatedAdministrativeMember: CreateUpdateAdministrativeMemberDTO
  ) => {
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ADMINISTRATIVE_MEMBERS_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAdministrativeMember),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log('Miembro administrativo actualizado correctamente');
        return;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update administrative member:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateAdministrativeMember, updateAdministrativeMemberError };
};

export default useUpdateAdministrativeMember;
