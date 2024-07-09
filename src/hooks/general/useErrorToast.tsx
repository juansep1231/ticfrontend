import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

export const useErrorToast = (error: Error | null) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [error, toast]);
};
