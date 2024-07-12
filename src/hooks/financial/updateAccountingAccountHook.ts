import { useState } from 'react';

export interface CreateUpdateAccountingAccountDTO {
  accountName: string;
  currentValue: number;
  initialBalanceDate: string;
  initialBalance: number;
  accountingAccountStatus: string;
}

const useUpdateAccountingAccount = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateAccountingAccount = async (id: number, updatedAccount: CreateUpdateAccountingAccountDTO) => {
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_ACCOUNTING_ACCOUNTS_ENDPOINT}/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAccount),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      if (response.status === 204) {
        console.log('Cuenta contable actualizada correctamente');
        return;
      }

      return await response.json();
    } catch (error: any) {
      console.error('Failed to update accounting account:', error);
      setUpdateError(error.message);
      throw error;
    }
  };

  return { updateAccountingAccount, updateError };
};

export default useUpdateAccountingAccount;
