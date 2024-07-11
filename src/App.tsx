import React from 'react';
import Layout from './components/Layout';
import Overview from './pages/Overview';

const App: React.FC = () => {
  return (
    <Layout>
      <Overview />
    </Layout>
  );
};

export default App;
