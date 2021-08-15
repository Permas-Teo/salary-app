import React from 'react';
import {
  Button,
  Container,
  Center,
  FormControl,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';

export const QueryFilter = ({
  setPage,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
}) => {
  return (
    <Container
      height={'270px'}
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
        Live Filter
      </Heading>

      <Stack direction={'column'} as={'form'} spacing={'12px'}>
        <FormControl>
          <NumberInput
            size="md"
            min={0}
            step={100}
            onChange={e => {
              setMinSalary(e);
              setPage(0);
            }}
            value={minSalary}
          >
            <NumberInputField
              borderColor={'gray.300'}
              placeholder={'Min Salary'}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <NumberInput
            size="md"
            min={minSalary ? minSalary : 0}
            step={100}
            onChange={e => {
              setMaxSalary(e);
              setPage(0);
            }}
            value={maxSalary}
          >
            <NumberInputField
              borderColor={'gray.300'}
              placeholder={'Max Salary'}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Center>
          <Button
            m={2}
            onClick={() => {
              if (minSalary || maxSalary) {
                setMaxSalary('');
                setMinSalary('');
                setPage(0);
              }
            }}
          >
            {'Reset'}
          </Button>
        </Center>
      </Stack>
    </Container>
  );
};
