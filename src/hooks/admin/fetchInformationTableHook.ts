import { useEffect, useState } from 'react';
import { OrganizationalInfo } from '../../types/organizational-models';
import { DEFAULT_STATE } from '../../utils/constants';

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
          throw new Error(
            `Error: ${response.status} ${response.statusText} - ${errorData.message}`
          );
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

  const updateAssociationState = (
    id: number,
    updatedData: Partial<OrganizationalInfo>
  ) => {
    setData((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      console.log('Updated data:', newData);
      return newData;
    });
  };

  const filteredAssociations = associations.filter(
    (item) => item.state_id === DEFAULT_STATE
  );

  return {
    associations: filteredAssociations,
    isLoadingAssociations,
    associationErrors,
    updateAssociationState,
  };
};

export default useFetchAssociations;



export interface ContributorDTO {
  id?: number;
  state_id?: number;
  plan: string;
  price: string;
  date: string;
  name: string;
  career: string;
  faculty: string;
  email: string;
}
