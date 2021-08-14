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

import { EditIcon } from '@chakra-ui/icons';

export const ClickableEditIcon = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditIcon w={5} h={5} cursor={'pointer'} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User {userId}</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
