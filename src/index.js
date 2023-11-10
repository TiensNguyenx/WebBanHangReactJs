import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={new QueryClient()}>

    <GlobalStyles> <App /></GlobalStyles>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);


reportWebVitals();
