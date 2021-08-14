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
  setRequestUpdate,
  setPage,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  reset,
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
        Filter
      </Heading>

      <Stack
        direction={'column'}
        as={'form'}
        spacing={'12px'}
        onSubmit={e => {
          e.preventDefault();
          setPage(0);
          setRequestUpdate(new Date());
        }}
      >
        <FormControl>
          <NumberInput
            size="md"
            min={0}
            step={100}
            onChange={e => {
              setMinSalary(e);
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
              reset();
            }}
          >
            {'Reset'}
          </Button>
          <Button colorScheme={'blue'} m={2} type="submit">
            {'Calculate'}
          </Button>
        </Center>
      </Stack>
    </Container>
  );
};
