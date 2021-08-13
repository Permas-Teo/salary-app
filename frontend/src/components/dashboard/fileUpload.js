import React, { useState, useMemo } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { API_URL } from '../../utils/constants';
import { useDropzone } from 'react-dropzone';
import {
  baseStyle,
  acceptStyle,
  rejectStyle,
} from '../../styles/dropzone-styles';
import { CheckIcon } from '@chakra-ui/icons';

export const FileUpload = () => {
  const [filesToSend, setFilesToSend] = useState([]);
  const [status, setStatus] = useState('');

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

  return (
    <>
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

      <Container
        maxW={'md'}
        bg={'whiteAlpha.100'}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        my={2}
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
          <Button
            onClick={() => {
              const fileToSend = acceptedFiles[0];
              const formData = new FormData();
              formData.append(`file`, fileToSend);
              fetch(API_URL + '/users/upload', {
                method: 'POST',
                body: formData,
              })
                .then(response => response.json())
                .then(res => {
                  console.log(res.detail);
                  setStatus(res.detail);
                });
              setFilesToSend([]);
            }}
          >
            Upload
          </Button>
        </VStack>
      </Container>
    </>
  );
};
