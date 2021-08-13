import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';

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

const HomePage = () => {
  const [res, setRes] = useState('');
  const [status, setStatus] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortToggle, setSortToggle] = useState('');

  function refresh() {
    setMinSalary('');
    setMaxSalary('');
    setPage(0);

    let params = new URLSearchParams();
    if (sortToggle) {
      params.append('sort', sortToggle);
    }

    fetch(API_URL + '/users?' + params.toString())
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData);
        setRes(resultData.results);
        setTotalPages(resultData.totalPages);
      });
  }

  useEffect(() => {
    refresh();
  }, []);

  function reset() {}

  function handleStatusChange(status) {
    setStatus(status);
  }

  function handleResChange(res) {
    setRes(res);
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
              onStatusChange={handleStatusChange}
              refresh={refresh}
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

                  let params = new URLSearchParams();
                  if (minSalary) {
                    params.append('minSalary', minSalary);
                  }
                  if (maxSalary) {
                    params.append('maxSalary', maxSalary);
                  }
                  if (sortToggle) {
                    params.append('sort', sortToggle);
                  }
                  console.log(API_URL + '/users?' + params.toString());

                  fetch(API_URL + '/users?' + params.toString())
                    .then(response => response.json()) // parse JSON from request
                    .then(resultData => {
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
                      refresh();
                    }}
                  >
                    {'Reset'}
                  </Button>
                  <Button m={2} type="submit">
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
          onResChange={handleResChange}
          minSalary={minSalary}
          maxSalary={maxSalary}
          onSortToggleChange={handleSortToggleChange}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default HomePage;
