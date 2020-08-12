import React from 'react';
import Child from './child'
import './App.css';

import { TransactionProvider } from './transContext'

function App() {
  return (

    <div>
      <TransactionProvider>
        <Child />
      </TransactionProvider>
    </div>
  );
}

export default App;
