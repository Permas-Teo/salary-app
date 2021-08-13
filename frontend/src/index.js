import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';

import Routes from './routes';
import './styles/index.css';

// import reportWebVitals from './utils/reportWebVitals';
// import * as serviceWorker from './utils/serviceWorker';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
