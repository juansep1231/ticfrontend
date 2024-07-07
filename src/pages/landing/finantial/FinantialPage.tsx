import { AddIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons';
import { Heading, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { TransactionTable } from './components/TransactionTable';

export const FinantialPage = () => {
  const [searchTransaction, setSearchTransaction] = useState('');

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', gap: 'lg', px: { base: 'md', lg: '3xl' } }}
    >
      <Heading>Transacciones</Heading>
      <TransactionTable />
    </Flex>
  );
};
