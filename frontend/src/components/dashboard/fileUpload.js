import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
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
              .then(success => console.log(success))
              .catch(error => console.log(error));

            setFilesToSend([]);
          }}
        >
          Upload
        </Button>
      </VStack>
    </Container>
  );
};
