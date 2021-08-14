import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';
import { patchUser } from '../../../api/api';

export const ClickableEditIcon = ({ userId, setRequestUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginField, setLoginField] = useState('');
  const [nameField, setNameField] = useState('');
  const [salaryField, setSalaryField] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <EditIcon w={5} h={5} cursor={'pointer'} onClick={onOpen} />

      <Modal size={'xs'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User {userId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              my={1}
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              borderColor={'gray.300'}
              type={'value'}
              placeholder={'login'}
              aria-label={'login'}
              value={loginField}
              onChange={e => {
                setLoginField(e.target.value);
              }}
            />
            <Input
              my={1}
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              borderColor={'gray.300'}
              type={'value'}
              placeholder={'name'}
              aria-label={'name'}
              value={nameField}
              onChange={e => {
                setNameField(e.target.value);
              }}
            />
            <NumberInput
              my={1}
              size="md"
              min={0}
              step={100}
              onChange={e => {
                setSalaryField(e);
              }}
              value={salaryField}
            >
              <NumberInputField
                borderColor={'gray.300'}
                placeholder={'salary'}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            {error && (
              <Text
                fontSize={'sm'}
                textAlign={'center'}
                color="red.600"
                fontWeight={'semibold'}
                mt={6}
              >
                {error}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mx={3}
              onClick={() => {
                const response = patchUser(
                  userId,
                  loginField,
                  nameField,
                  salaryField
                );
                response.then(res => {
                  if (res.detail) {
                    setError(res.detail);
                  } else {
                    setRequestUpdate(new Date());
                    onClose();
                    setLoginField('');
                    setNameField('');
                    setSalaryField('');
                    setError('');
                  }
                });
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
