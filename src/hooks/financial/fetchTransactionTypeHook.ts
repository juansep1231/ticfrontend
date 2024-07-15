import { useState, useEffect } from 'react';

interface StateDTO {
  state_Name: string;
}

export const useFetchTransactionStates = () => {
  const [transactionStates, setTransactionStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_TRANSACTION_STATES_ENDPOINT}`;

  useEffect(() => {
    const fetchTransactionStates = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: StateDTO[] = await response.json();
        setTransactionStates(data.map((state) => state.state_Name));
        console.log(
          'Fetched transaction states:',
          data.map((state) => state.state_Name)
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionStates();
  }, [endpoint]);

  return { transactionStates, isLoading, error };
};

export default useFetchTransactionStates;
