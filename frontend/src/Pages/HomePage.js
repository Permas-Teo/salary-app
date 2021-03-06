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

  const userLanguage =
    window.navigator.userLanguage || window.navigator.language;

  useEffect(() => {
    const refresh = () => {
      let resultData = fetchUsers(sortToggle, minSalary, maxSalary, page);
      resultData.then(resultData => {
        setRes(resultData.results);
        setTotalPages(resultData.totalPages);
      });
    };
    refresh();
  }, [sortToggle, minSalary, maxSalary, page, requestUpdate]);

  return (
    <Layout>
      <Alerts setStatus={setStatus} status={status} />
      <Text mt={2} mr={2} align={'right'}>
        {userLanguage}
      </Text>
      <Container maxWidth={'10xl'}>
        <Flex flexWrap={'wrap'} justify="center">
          <Box m={2}>
            <FileUpload
              setStatus={setStatus}
              setPage={setPage}
              setRequestUpdate={setRequestUpdate}
            />
          </Box>
          <Box m={2}>
            <QueryFilter
              setPage={setPage}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
            />
          </Box>
        </Flex>
      </Container>

      {res && (
        <SalaryTable
          data={res}
          setSortToggle={setSortToggle}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setRequestUpdate={setRequestUpdate}
        />
      )}
    </Layout>
  );
};

export default HomePage;
