import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { Box, Container, Flex, Center } from '@chakra-ui/react';

import {
  Button,
  FormControl,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';

import { SalaryTable } from '../components/dashboard/salaryTable';
import { FileUpload } from '../components/dashboard/fileUpload';
import { Alerts } from '../components/dashboard/alerts';
import { fetchUsers } from '../api/api';

const HomePage = () => {
  const [res, setRes] = useState('');
  const [status, setStatus] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortToggle, setSortToggle] = useState('');
  const [requestUpdate, setRequestUpdate] = useState(new Date());

  function reset() {
    setMinSalary('');
    setMaxSalary('');
    setPage(0);

    let resultData = fetchUsers(sortToggle);
    resultData.then(resultData => {
      console.log(resultData);
      setRes(resultData.results);
      setTotalPages(resultData.totalPages);
    });
  }

  function refresh() {
    let resultData = fetchUsers(sortToggle, minSalary, maxSalary, page);
    resultData.then(resultData => {
      console.log(resultData);
      setRes(resultData.results);
      setTotalPages(resultData.totalPages);
    });
  }

  useEffect(() => {
    refresh();
  }, [requestUpdate]);

  function handleStatusChange(status) {
    setStatus(status);
  }

  function handleSortToggleChange(sortToggle) {
    setSortToggle(sortToggle);
  }

  return (
    <Layout>
      <Alerts onStatusChange={handleStatusChange} status={status} />

      <Container maxWidth={'10xl'}>
        <Flex flexWrap={'wrap'} justify="center">
          <Box m={2}>
            <FileUpload
              setRequestUpdate={setRequestUpdate}
              onStatusChange={handleStatusChange}
              flex="1"
            />
          </Box>
          <Box m={2}>
            <Container
              height={'270px'}
              maxW={'xs'}
              minW={'xs'}
              bg={'whiteAlpha.100'}
              boxShadow={'xl'}
              rounded={'lg'}
              p={6}
              direction={'column'}
            >
              <Heading
                as={'h2'}
                fontSize={{ base: 'xl', sm: '2xl' }}
                textAlign={'center'}
                my={5}
              >
                Filter
              </Heading>

              <Stack
                direction={'column'}
                as={'form'}
                spacing={'12px'}
                onSubmit={e => {
                  e.preventDefault();
                  let resultData = fetchUsers(sortToggle, minSalary, maxSalary);
                  resultData.then(resultData => {
                    console.log(resultData);
                    setRes(resultData.results);
                    setPage(0);
                    setTotalPages(resultData.totalPages);
                  });
                }}
              >
                <FormControl>
                  <NumberInput
                    size="md"
                    min={0}
                    step={100}
                    onChange={e => {
                      setMinSalary(e);
                    }}
                    value={minSalary}
                  >
                    <NumberInputField
                      borderColor={'gray.300'}
                      placeholder={'Min Salary'}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <NumberInput
                    size="md"
                    min={minSalary ? minSalary : 0}
                    step={100}
                    onChange={e => {
                      setMaxSalary(e);
                    }}
                    value={maxSalary}
                  >
                    <NumberInputField
                      borderColor={'gray.300'}
                      placeholder={'Max Salary'}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Center>
                  <Button
                    m={2}
                    onClick={() => {
                      reset();
                    }}
                  >
                    {'Reset'}
                  </Button>
                  <Button colorScheme={'blue'} m={2} type="submit">
                    {'Calculate'}
                  </Button>
                </Center>
              </Stack>
            </Container>
          </Box>
        </Flex>
      </Container>

      {res ? (
        <SalaryTable
          data={res}
          onSortToggleChange={handleSortToggleChange}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setRequestUpdate={setRequestUpdate}
        />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default HomePage;
