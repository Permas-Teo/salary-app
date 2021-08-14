import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { SalaryTable } from '../components/dashboard/table/salaryTable';
import { FileUpload } from '../components/dashboard/fileUpload';
import { QueryFilter } from '../components/dashboard/queryFilter';
import { Alerts } from '../components/dashboard/alerts';
import { fetchUsers } from '../api/api';

const HomePage = () => {
  const [res, setRes] = useState('');
  const [status, setStatus] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortToggle, setSortToggle] = useState('');
  const [requestUpdate, setRequestUpdate] = useState(new Date());

  const userLanguage = window.navigator.userLanguage || window.navigator.language;
  // console.log(userLanguage);

  function reset() {
    setMinSalary('');
    setMaxSalary('');
    setPage(0);

    let resultData = fetchUsers(sortToggle);
    resultData.then(resultData => {
      setRes(resultData.results);
      setTotalPages(resultData.totalPages);
    });
  }

  function refresh() {
    let resultData = fetchUsers(sortToggle, minSalary, maxSalary, page);
    resultData.then(resultData => {
      setRes(resultData.results);
      setTotalPages(resultData.totalPages);
    });
  }

  useEffect(() => {
    refresh();
  }, [requestUpdate]);

  function handleStatusChange(status) {
    setStatus(status);
  }

  function handleSortToggleChange(sortToggle) {
    setSortToggle(sortToggle);
  }

  return (
    <Layout>
      <Alerts onStatusChange={handleStatusChange} status={status} />
      <Text mt={2} mr={2} align={"right"}>{userLanguage}</Text>
      <Container maxWidth={'10xl'}>
        <Flex flexWrap={'wrap'} justify="center">
          <Box m={2}>
            <FileUpload
              setRequestUpdate={setRequestUpdate}
              onStatusChange={handleStatusChange}
              flex="1"
            />
          </Box>
          <Box m={2}>
            <QueryFilter
              setRequestUpdate={setRequestUpdate}
              setPage={setPage}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
              reset={reset}
            />
          </Box>
        </Flex>
      </Container>

      {res ? (
        <SalaryTable
          data={res}
          onSortToggleChange={handleSortToggleChange}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setRequestUpdate={setRequestUpdate}
        />
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default HomePage;
