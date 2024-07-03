import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { OrganizationalInfo } from '../../../types/organizational-models';

interface InformationTableProps {
  info: OrganizationalInfo[];
  onEdit: (info: OrganizationalInfo) => void;
  onDelete: (id: number) => void;
}

export const InformationTable = ({
  info,
  onEdit,
  onDelete,
}: InformationTableProps) => {
  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table
        variant="simple"
        sx={{
          'border': '1px solid',
          'borderColor': 'brand.blue',
          'borderCollapse': 'collapse',
          'textColor': 'surface.default',
          'fontSize': 'text.md',
          'tableLayout': 'fixed',
          'width': '100%',
          '& th, & td': {
            color: 'text.default',
            fontSize: 'text.md',
            textAlign: 'center',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          },
          '& th': {
            bg: 'brand.blue',
            color: 'white',
            height: '58px',
          },
          '& td': {
            border: '1px solid',
            borderColor: 'brand.blue',
          },
        }}
      >
        <Thead>
          <Tr sx={{ color: 'surface.default' }}>
            <Th
              sx={{
                width: '10%',
                borderRight: '1px',
                borderColor: 'primary.100',
              }}
            ></Th>
            <Th
              sx={{
                width: '45%',
                borderRight: '1px',
                borderColor: 'primary.100',
              }}
            >
              Misión
            </Th>
            <Th
              sx={{
                width: '45%',
                borderLeft: '1px',
                borderColor: 'primary.100',
              }}
            >
              Visión
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {info.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                No olvides ingresar la información organizacional
              </Td>
            </Tr>
          ) : (
            info.map((inf) => (
              <Tr key={inf.id}>
                <Td>
                  <Flex
                    sx={{
                      gap: 'sm',
                      flexDirection: { sm: 'column', lg: 'row' },
                    }}
                  >
                    <IconButton
                      aria-label="Edit Information"
                      icon={<FaEdit size={16} />}
                      onClick={() => onEdit(inf)}
                      size="sm"
                      sx={{
                        bg: 'none',
                        color: 'brand.blue',
                        _hover: {
                          bg: 'secondary.100',
                          color: 'primary.default',
                        },
                      }}
                    />
                    <IconButton
                      aria-label="Delete Information"
                      icon={<FaTrash size={16} />}
                      onClick={() => onDelete(inf.id)}
                      size="sm"
                      sx={{
                        bg: 'none',
                        color: 'brand.blue',
                        _hover: {
                          bg: 'secondary.100',
                          color: 'primary.default',
                        },
                      }}
                    />
                  </Flex>
                </Td>
                <Td>
                  <Flex sx={{ flexDirection: 'column' }}>
                    {inf.mission.split('\n').map((line, index) => (
                      <Text key={index}>{line}</Text>
                    ))}
                  </Flex>
                </Td>
                <Td>
                  <Flex sx={{ flexDirection: 'column' }}>
                    {inf.vision.split('\n').map((line, index) => (
                      <Text key={index}>{line}</Text>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
