import {
  Box,
  Center,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

export const SalaryTable = ({ data }) => {
  return (
    <Center mb={6}>
      <Container
        maxW={'5xl'}
        bg={'whiteAlpha.100'}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}
      >
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Login</Th>
                <Th>Name</Th>
                <Th isNumeric>Salary</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 && (
                <>
                  {data.map(singleItem => (
                    <Tr
                      // cursor={"pointer"}
                      key={singleItem.id}
                    >
                      <Td>{singleItem.id}</Td>
                      <Td>{singleItem.login}</Td>
                      <Td>{singleItem.name}</Td>
                      <Td isNumeric>{singleItem.salary}</Td>
                    </Tr>
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Center>
  );
};
