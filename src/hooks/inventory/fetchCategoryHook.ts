import { useState, useEffect } from 'react';

export interface CategoryDTO {
    description: string;
  }
export const useFetchCategories = () => {
  const [categoriesData, setCategoriesData] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CATEGORIES_ENDPOINT}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: CategoryDTO[] = await response.json();
        setCategoriesData(data.map((category) => category.description));
        console.log(data);
      } catch (error) {
        if (error instanceof Error) {
          setCategoriesError(error);
        } else {
          setCategoriesError(new Error('An unknown error occurred'));
        }
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { categoriesData, categoriesLoading, categoriesError };
};

