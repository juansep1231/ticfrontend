import { useEffect, useState } from 'react';
import { Inventory } from '../../types/inventory-models';


export const useFetchInventoryMovements = () => {
  const [inventoryMovements, setInventoryMovements] = useState<Inventory[]>([]);
  const [isLoadingInventoryMovements, setIsLoadingInventoryMovements] = useState(true);
  const [inventoryMovementErrors, setInventoryMovementErrors] = useState<Error | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_INVENTORY_MOVEMENTS_ENDPOINT}`;

  useEffect(() => {
    const fetchInventoryMovements = async () => {
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          const errorData = await response.json(); // Read the response body
          throw new Error(
            `Error: ${response.status} ${response.statusText} - ${errorData.message}`
          );
        }

        const data: Inventory[] = await response.json();
        setInventoryMovements(data);
        console.log('Fetched inventory movements:', data);
      } catch (error: any) {
        if (error instanceof Error) {
          setInventoryMovementErrors(error);
        } else {
          setInventoryMovementErrors(Error('Unknown error'));
        }
      } finally {
        setIsLoadingInventoryMovements(false);
      }
    };

    fetchInventoryMovements();
  }, [endpoint]);

  const updateInventoryMovementState = (
    id: number,
    updatedData: Partial<Inventory>
  ) => {
    setInventoryMovements((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      console.log('Updated inventory movements:', newData);
      return newData;
    });
  };

  /*const filteredInventoryMovements = inventoryMovements.filter(
    (item) => item.movementType === 'Specific Movement Type' // Adjust the filter condition as needed
  );*/

  return {
    inventoryMovements,
    isLoadingInventoryMovements,
    inventoryMovementErrors,
    updateInventoryMovementState,
  };
};

export default useFetchInventoryMovements;
