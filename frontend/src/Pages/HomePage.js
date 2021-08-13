import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';
import { SalaryTable } from '../components/salaryTable';
import { useDropzone } from 'react-dropzone';
import { baseStyle, acceptStyle, rejectStyle } from '../styles/dropzone-styles';
import { CheckIcon } from '@chakra-ui/icons';

const HomePage = () => {
  const [res, setRes] = useState('');
  const [filesToSend, setFilesToSend] = useState([]);

  function onDrop(acceptedFiles) {
    // setFilesToSend(old => [...old, ...acceptedFiles]);
    setFilesToSend(acceptedFiles);
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: '.csv, application/vnd.ms-excel, text/csv',
    multiple: false,
  });

  const files = filesToSend.map(file => (
    <ListItem key={file.name}>
      <ListIcon as={CheckIcon} color="green.500" />
      {file.name}
    </ListItem>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragReject, isDragAccept]
  );

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
          maxW={'md'}
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
            CSV Upload
          </Heading>
          <Box {...getRootProps({ style })} m={2}>
            <input {...getInputProps()} />
            <Text>Drag and drop / Click here to upload csv file</Text>
          </Box>
          <VStack>
            <List py={2}>{files}</List>
            <Button onClick={() => console.log(acceptedFiles)}>Upload</Button>
          </VStack>
        </Container>
      </Center>

      {res ? <SalaryTable data={res} /> : <></>}
    </Layout>
  );
};

export default HomePage;
