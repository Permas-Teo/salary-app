import React, { useState, useEffect } from 'react';
import { Center, Container, Heading } from '@chakra-ui/react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';
import { SalaryTable } from '../components/salaryTable';

const HomePage = () => {
  const [res, setRes] = useState('');

  useEffect(() => {
    fetch(API_URL + '/users')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData);
        setRes(resultData);
      });
  }, []);

  return (
    <Layout>
      <Center mb={6}>
        <Container
          maxW={'lg'}
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
            Home
          </Heading>
        </Container>
      </Center>

      {res ? <SalaryTable data={res} /> : <></>}
    </Layout>
  );
};

export default HomePage;
