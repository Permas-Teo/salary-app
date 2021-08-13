import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { API_URL } from '../utils/constants';
import { SalaryTable } from '../components/dashboard/salaryTable';
import { FileUpload } from '../components/dashboard/fileUpload';

const HomePage = () => {
  const [res, setRes] = useState('');

  useEffect(() => {
    fetch(API_URL + '/users')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        // console.log(resultData);
        setRes(resultData);
      });
  }, [res]);

  return (
    <Layout>
      <FileUpload />
      {res ? <SalaryTable data={res} /> : <></>}
    </Layout>
  );
};

export default HomePage;
