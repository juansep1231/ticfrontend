import { useEffect, useState } from 'react';

import { CreateUpdateEventDTO } from './updateEventhook';

  export interface EventView {
    id?: number;
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


export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventView[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventErrors, setEventErrors] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_EVENTS_ENDPOINT}`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          const errorData = await response.json(); // Read the response body
          throw new Error(
            `Error: ${response.status} ${response.statusText} - ${errorData.message}`
          );
        }

        const data: EventView[] = await response.json();
        setEvents(data);
        console.log('Fetched events:', data);
      } catch (error: any) {
        if (error instanceof Error) {
          setEventErrors(error);
        } else {
          setEventErrors(Error('Unknown error'));
        }
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [endpoint]);

  const updateEventState = (
    id: number,
    updatedData: Partial<EventView>
  ) => {
    setEvents((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      console.log('Updated events:', newData);
      return newData;
    });
  };

  const addEventState = (newEvent:CreateUpdateEventDTO ) => {

    setEvents((prevData) => {
      const newData = [...prevData, newEvent];
      console.log('Added new member:', newData,"dsdsdsd");
      return newData;
    });
  };


  return {
    events,
    isLoadingEvents,
    eventErrors,
    updateEventState,
    addEventState
  };
};

export default useFetchEvents;
