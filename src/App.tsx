import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import TransactionDetails from './components/TransactionDetails';
import Analytics from './pages/Analytics';

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' Component={Overview} />
          <Route path='/analytics' Component={Analytics} />
          <Route path='/tx/:id' Component={TransactionDetails} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
