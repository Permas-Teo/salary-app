import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';

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

  const generateTableRow = singleItem => {
    return (
      <>
        <Td>{singleItem.id}</Td>
        <Td>{singleItem.login}</Td>
        <Td>{singleItem.name}</Td>
        <Td isNumeric>{singleItem.salary}</Td>
      </>
    );
  };

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

      {res ? (
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
                    <Th>ID</Th>
                    <Th>Login</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Salary</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {res.length > 0 && (
                    <>
                      {res.map(singleItem => (
                        <Tr
                          // cursor={"pointer"}
                          key={singleItem.id}
                        >
                          {generateTableRow(singleItem)}
                        </Tr>
                      ))}
                    </>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Container>
        </Center>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default HomePage;
