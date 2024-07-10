import { useEffect, useState } from "react";
import { OrganizationalInfo } from "../../types/organizational-models";

export const useFetchAssociations = () => {
  const [associations, setData] = useState<OrganizationalInfo[]>([]);
  const [isLoadingAssociations, setIsLoading] = useState(true);
  const [associationErrors, setError] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ASSOCIATIONS_ENDPOINT}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          const errorData = await response.json(); // Lee el cuerpo de la respuesta
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorData.message}`);
        }

        const data: OrganizationalInfo[] = await response.json();
        setData(data);
        console.log('Fetched data:', data);
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(Error('Error desconocido'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const updateAssociationState = (id: number, updatedData: Partial<OrganizationalInfo>) => {
    setData(prevData => {
      const newData = prevData.map(item => item.id === id ? { ...item, ...updatedData } : item);
      console.log("Updated data:", newData);
      return newData;
    });
  };

  const addAssociationState = (newData: OrganizationalInfo) => {
    setData(prevData => [...prevData, newData]);
  }

  const filteredAssociations = associations.filter(item => item.state_id === 1);

  return { associations: filteredAssociations, isLoadingAssociations, associationErrors, updateAssociationState, addAssociationState};
};

export default useFetchAssociations;
