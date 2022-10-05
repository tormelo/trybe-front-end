import React, { useContext } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';

function NameFilterForm() {
  const { nameFilter, setNameFilter } = useContext(SWPlanetsContext);

  const handleChange = ({ target }) => {
    setNameFilter(target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ nameFilter }
      onChange={ handleChange }
    />
  );
}

export default NameFilterForm;
