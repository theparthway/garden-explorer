import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import TransactionDetails from './components/TransactionDetails';

const App: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' Component={Overview} />
          <Route path='/tx/:id' Component={TransactionDetails} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
