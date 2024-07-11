import { useState } from 'react';

export interface CreateUpdateEventDTO {
  title: string;
  status: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  budgetStatus: string;
  location: string;
  income?: number;
}

const useUpdateEvent = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateEvent = async (id: number, updatedEvent: CreateUpdateEventDTO) => {
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_EVENTS_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log('Evento actualizado correctamente');
        return;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update event:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateEvent, updateError };
};

export default useUpdateEvent;
