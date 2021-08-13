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
  Td,
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, UpDownIcon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import { fetchUsers } from '../../api/api';

export const SalaryTable = ({
  data,
  onResChange,
  minSalary,
  maxSalary,
  onSortToggleChange,
  totalPages,
  setPage,
  page,
}) => {
  const [idToggle, setIdToggle] = useState('');
  const [loginToggle, setLoginToggle] = useState('');
  const [nameToggle, setNameToggle] = useState('');
  const [salaryToggle, setSalaryToggle] = useState('');
  const [sortToggle, setSortToggle] = useState('');

  function resetAllStatus() {
    setIdToggle('');
    setLoginToggle('');
    setNameToggle('');
    setSalaryToggle('');
  }

  function toggle(status, setFunc, text) {
    resetAllStatus();
    let tempSortToggle = '';

    if (status === 'asc') {
      setFunc('desc');
      setSortToggle('-' + text);
      onSortToggleChange('-' + text);
      tempSortToggle = '-' + text;
    } else if (status === 'desc') {
      setFunc('');
    } else {
      setFunc('asc');
      setSortToggle('+' + text);
      onSortToggleChange('+' + text);
      tempSortToggle = '+' + text;
    }

    let resultData = fetchUsers(tempSortToggle, minSalary, maxSalary);
    resultData.then(resultData => {
      console.log(resultData);
      setPage(0);
      onResChange(resultData.results);
    });
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
        maxW={'5xl'}
        bg={'whiteAlpha.100'}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Box overflowX="auto">
          <Table variant="simple">
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
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 && (
                <>
                  {data.map(singleItem => (
                    <Tr key={singleItem.id}>
                      <Td>{singleItem.id}</Td>
                      <Td>{singleItem.login}</Td>
                      <Td>{singleItem.name}</Td>
                      <Td>{singleItem.salary}</Td>
                    </Tr>
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
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={({ selected }) => {
                setPage(selected);
                let resultData = fetchUsers(
                  sortToggle,
                  minSalary,
                  maxSalary,
                  selected
                );
                resultData.then(resultData => {
                  console.log(resultData);
                  onResChange(resultData.results);
                });
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
