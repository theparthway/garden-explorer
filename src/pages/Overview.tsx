import { FC } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import Info from '../components/Info';

const Overview: FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  }

  return (
    <div className="py-4 px-60 shadow rounded-lg">
      <SearchBar onSearch={handleSearch} />
      <Info />
      <Table />
    </div>
  );
};

export default Overview;
