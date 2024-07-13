import { useState } from 'react';
import { CreateUpdateProviderDTO } from './updateProviderHook';
import { Supplier } from '../../types/supplier-models';


export const usePostProvider = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [postedProvider, setPostedProvider] = useState<Supplier | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PROVIDERS_ENDPOINT}`;

  const postProvider = async (providerDTO: CreateUpdateProviderDTO) => {
    setIsPosting(true);
    setPostError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(providerDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data: Supplier = await response.json();
      setPostedProvider(data);
      console.log('Posted provider:', data);
    } catch (error: any) {
      if (error instanceof Error) {
        setPostError(error);
      } else {
        setPostError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  return { isPosting, postError, postedProvider, postProvider };
};

export default usePostProvider;
