import React from 'react';
import { Tr, Td, HStack } from '@chakra-ui/react';

import { ClickableEditIcon } from './clickableEditIcon';
import { ClickableDeleteIcon } from './clickableDeleteIcon';

export const TableRow = ({ data, setRequestUpdate }) => {
  return (
    <>
      <Tr key={data.id}>
        <Td>{data.id}</Td>
        <Td>{data.login}</Td>
        <Td>{data.name}</Td>
        <Td>{data.salary}</Td>
        <Td isNumeric>
          <HStack>
            <ClickableEditIcon
              userId={data.id}
              setRequestUpdate={setRequestUpdate}
            />
            <ClickableDeleteIcon
              userId={data.id}
              setRequestUpdate={setRequestUpdate}
            />
          </HStack>
        </Td>
      </Tr>
    </>
  );
};
