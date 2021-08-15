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
import { uploadFile } from '../../api/api';
import { useDropzone } from 'react-dropzone';
import {
  baseStyle,
  acceptStyle,
  rejectStyle,
} from '../../styles/dropzone-styles';
import { CheckIcon } from '@chakra-ui/icons';

export const FileUpload = ({ setStatus, setPage, setRequestUpdate }) => {
  const [filesToSend, setFilesToSend] = useState([]);
  const [fileFlag, setFileFlag] = useState(true);

  function upload() {
    const fileToSend = acceptedFiles[0];
    const response = uploadFile(fileToSend);

    response.then(res => {
      setStatus(res.detail);
      setTimeout(function () {
        setPage(0);
        setRequestUpdate(new Date());
      }, 1000);
      setFilesToSend([]);
      setFileFlag(true);
    });
  }

  function onDrop(acceptedFiles) {
    // setFilesToSend(old => [...old, ...acceptedFiles]);
    setFilesToSend(acceptedFiles);
    setFileFlag(false);
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
      height={'270px'}
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
        <Button disabled={fileFlag} onClick={() => upload()}>
          Upload
        </Button>
      </VStack>
    </Container>
  );
};
