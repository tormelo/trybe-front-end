import { node } from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchSWPlanets from '../services/SWPlanetsAPI';
import SWPlanetsContext from './SWPlanetsContext';

function SWPlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [planetProperties, setPlanetProperties] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [sortSettings, setSortSettings] = useState();

  useEffect(() => {
    const getSWPlanets = async () => {
      const data = await fetchSWPlanets();
      setPlanets(data);
      setPlanetProperties(Object.keys(data[0]));
    };
    getSWPlanets();
  }, []);

  useEffect(() => {
    const isComplientWithFilter = (planet, filter) => {
      const { column, operator, value } = filter;
      const comparisonValue = Number(value);
      const planetValue = Number(planet[column]);

      switch (operator) {
      case 'maior que':
        return planetValue > comparisonValue;
      case 'menor que':
        return planetValue < comparisonValue;
      case 'igual a':
        return planetValue === comparisonValue;
      // no default
      }
    };

    const compareFunction = (a, b) => {
      if (!sortSettings) return 0;
      const bAfter = -1;

      const { column, order } = sortSettings;
      const paramA = Number(a[column]);
      const paramB = Number(b[column]);
      if (Number.isNaN(paramA)) return 1;
      if (Number.isNaN(paramB)) return bAfter;

      switch (order) {
      case 'ASC':
        return paramA - paramB;
      case 'DESC':
        return paramB - paramA;
      // no default
      }
    };

    let currentPlanets = planets.filter((planet) => planet.name.includes(nameFilter));
    numericFilters.forEach((filter) => {
      currentPlanets = currentPlanets
        .filter((planet) => isComplientWithFilter(planet, filter));
    });
    currentPlanets.sort(compareFunction);
    setFilteredPlanets(currentPlanets);
  }, [planets, nameFilter, numericFilters, sortSettings]);

  const addNumericFilter = (numericFilter) => {
    setNumericFilters([...numericFilters, numericFilter]);
  };

  const removeFilter = (column) => {
    setNumericFilters((prevFilters) => (
      prevFilters.filter((filter) => filter.column !== column)
    ));
  };

  const removeAllFilters = () => {
    setNameFilter('');
    setNumericFilters([]);
  };

  const updateSortSettings = (settings) => {
    setSortSettings(settings);
  };

  const contextValue = {
    filteredPlanets,
    planetProperties,
    nameFilter,
    numericFilters,
    sortSettings,
    setNameFilter,
    addNumericFilter,
    removeFilter,
    removeAllFilters,
    updateSortSettings,
  };

  return (
    <SWPlanetsContext.Provider value={ contextValue }>
      {children}
    </SWPlanetsContext.Provider>
  );
}

SWPlanetsProvider.propTypes = {
  children: node,
}.isRequired;

export default SWPlanetsProvider;
