import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

export const Alerts = ({ onStatusChange, status }) => {
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
            onClick={() => onStatusChange('')}
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
            onClick={() => onStatusChange('')}
          />
        </Alert>
      )}
    </>
  );
};
