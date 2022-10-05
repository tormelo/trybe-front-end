import React from 'react';
import './App.css';
import FilterSection from './components/FilterSection';
import Table from './components/Table';
import SWPlanetsProvider from './context/SWPlanetsProvider';

function App() {
  return (
    <SWPlanetsProvider>
      <FilterSection />
      <Table />
    </SWPlanetsProvider>
  );
}

export default App;
