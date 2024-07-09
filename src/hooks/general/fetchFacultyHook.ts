import { useState, useEffect } from 'react';
export interface FacultyDTO {
  faculty_Name: string;
}

export const useFetchFaculties = () => {
  const [facultiesData, setFacultiesData] = useState<string[]>([]);
  const [facultiesLoading, setFacultiesLoading] = useState(true);
  const [facultiesError, setFacultiesError] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_FACULTIES_ENDPOINT}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: FacultyDTO[] = await response.json();
        setFacultiesData(data.map((faculty) => faculty.faculty_Name));
        console.log(data);
      } catch (error) {
        if (error instanceof Error) {
          setFacultiesError(error);
        } else {
          setFacultiesError(new Error('An unknown error occurred'));
        }
      } finally {
        setFacultiesLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { facultiesData, facultiesLoading, facultiesError };
};

export default useFetchFaculties;
