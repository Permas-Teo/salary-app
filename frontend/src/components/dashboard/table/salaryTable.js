import React, { useState } from 'react';
import {
  Box,
  Center,
  Container,
  Icon,
  Text,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, UpDownIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import { TableRow } from './tableRow';

export const SalaryTable = ({
  data,
  setSortToggle,
  totalPages,
  setPage,
  page,
  setRequestUpdate,
}) => {
  const [idToggle, setIdToggle] = useState('');
  const [loginToggle, setLoginToggle] = useState('');
  const [nameToggle, setNameToggle] = useState('');
  const [salaryToggle, setSalaryToggle] = useState('');

  function resetAllStatus() {
    setIdToggle('');
    setLoginToggle('');
    setNameToggle('');
    setSalaryToggle('');
  }

  function toggle(status, setFunc, text) {
    resetAllStatus();

    if (status === 'asc') {
      setFunc('desc');
      setSortToggle('-' + text);
    } else if (status === 'desc') {
      setFunc('');
      setSortToggle('');
    } else {
      setFunc('asc');
      setSortToggle('+' + text);
    }

    setPage(0);
  }

  function displayToggleIcon(status) {
    if (status === 'asc') {
      return <Icon color={'pink.400'} as={TriangleUpIcon} />;
    } else if (status === 'desc') {
      return <Icon color={'pink.400'} as={TriangleDownIcon} />;
    } else {
      return <Icon as={UpDownIcon} />;
    }
  }

  return (
    <Center mb={6}>
      <Container
        maxW={'6xl'}
        bg={'whiteAlpha.100'}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Box overflowX="auto">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th
                  cursor={'pointer'}
                  onClick={() => {
                    toggle(idToggle, setIdToggle, 'id');
                  }}
                >
                  <HStack>
                    <Text>id</Text>
                    {displayToggleIcon(idToggle)}
                  </HStack>
                </Th>
                <Th
                  cursor={'pointer'}
                  onClick={() => {
                    toggle(loginToggle, setLoginToggle, 'login');
                  }}
                >
                  <HStack>
                    <Text>login</Text>
                    {displayToggleIcon(loginToggle)}
                  </HStack>
                </Th>
                <Th
                  cursor={'pointer'}
                  onClick={() => {
                    toggle(nameToggle, setNameToggle, 'name');
                  }}
                >
                  <HStack>
                    <Text>name</Text>
                    {displayToggleIcon(nameToggle)}
                  </HStack>
                </Th>
                <Th
                  isNumeric
                  cursor={'pointer'}
                  onClick={() => {
                    toggle(salaryToggle, setSalaryToggle, 'salary');
                  }}
                >
                  <HStack>
                    <Text>salary</Text>
                    {displayToggleIcon(salaryToggle)}
                  </HStack>
                </Th>
                <Th>
                  <HStack>
                    <Text>Functions</Text>
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 && (
                <>
                  {data.map(singleItem => (
                    <TableRow
                      data={singleItem}
                      key={singleItem.id}
                      setRequestUpdate={setRequestUpdate}
                    />
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </Box>
        <Center mt={6}>
          <Box>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              initialPage={0}
              forcePage={page}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={({ selected }) => {
                setPage(selected);
              }}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </Box>
        </Center>
      </Container>
    </Center>
  );
};
