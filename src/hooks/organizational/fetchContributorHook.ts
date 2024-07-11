import { useEffect, useState } from 'react';
import { DEFAULT_STATE } from '../../utils/constants';
import { Subscriber } from '../../types/subscription-models';
import { format, isValid, parseISO } from 'date-fns';
import { formatDate } from '../../utils/format-date-helper';



export const useFetchContributors = () => {
  const [contributors, setContributors] = useState<Subscriber[]>([]);
  const [isLoadingContributors, setIsLoadingContributors] = useState(true);
  const [contributorErrors, setContributorErrors] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTRIBUTORS_ENDPOINT}`;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          const errorData = await response.json(); // Read the response body
          throw new Error(
            `Error: ${response.status} ${response.statusText} - ${errorData.message}`
          );
        }

        const data: Subscriber[] = await response.json();

        setContributors(data);
        console.log('Fetched contributors:', data);
      } catch (error: any) {
        if (error instanceof Error) {
          setContributorErrors(error);
        } else {
          setContributorErrors(Error('Unknown error'));
        }
      } finally {
        setIsLoadingContributors(false);
      }
    };

    fetchContributors();
  }, [endpoint]);

  const updateContributorState = (
    id: number,
    updatedData: Partial<Subscriber>
  ) => {
    setContributors((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData, date: formatDate(updatedData.date || item.date) } : item
      );
      console.log('Updated contributors:', newData);
      return newData;
    });
  };

  const filteredContributors = contributors.filter(
    (item) => item.state_id === DEFAULT_STATE // Adjust the filter condition as needed
  );

  return {
    contributors: filteredContributors,
    isLoadingContributors,
    contributorErrors,
    updateContributorState,
  };
};

export default useFetchContributors;
