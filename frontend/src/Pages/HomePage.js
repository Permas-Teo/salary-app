import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Container,
  Flex,
} from '@chakra-ui/react';

import { SalaryTable } from '../components/dashboard/salaryTable';
import { FileUpload } from '../components/dashboard/fileUpload';

const HomePage = () => {
  const [res, setRes] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(API_URL + '/users')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        // console.log(resultData);
        setRes(resultData);
      });
  }, [res]);

  function handleStatusChange(status) {
    setStatus(status);
  }

  return (
    <Layout>
      {status && status === 'Success' && (
        <Alert variant="solid" status="success">
          <AlertIcon />
          <AlertTitle mr={2}>File uploaded succesfully!</AlertTitle>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setStatus('')}
          />
        </Alert>
      )}

      {status && status !== 'Success' && (
        <Alert variant="solid" status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{status}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setStatus('')}
          />
        </Alert>
      )}

      <Container maxWidth={'10xl'}>
        <Flex flexWrap={'wrap'} justify="center">
          <Box m={2}>
            <FileUpload onStatusChange={handleStatusChange} flex="1" />
          </Box>
          <Box m={2}>
            <FileUpload flex="1" />
          </Box>
        </Flex>
      </Container>

      {res ? <SalaryTable data={res} /> : <></>}
    </Layout>
  );
};

export default HomePage;
