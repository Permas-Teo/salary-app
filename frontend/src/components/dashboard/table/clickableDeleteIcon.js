import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import { deleteUser } from '../../../api/api';

export const ClickableDeleteIcon = ({ userId, setRequestUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DeleteIcon w={5} h={5} cursor={'pointer'} onClick={onOpen} />

      <Modal size={'xs'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User {userId}</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mx={3}
              onClick={() => {
                deleteUser(userId);
                setRequestUpdate(new Date());
                onClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
