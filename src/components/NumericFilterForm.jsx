import React, { useContext, useEffect, useState } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';
import { COLUMNS, OPERATORS } from '../helpers/constants';

function NumericFilterForm() {
  const [formData, setFormData] = useState({
    column: COLUMNS[0],
    operator: OPERATORS[0],
    value: 0,
  });
  const [validColumns, setValidColumns] = useState(COLUMNS);
  const { numericFilters, addNumericFilter } = useContext(SWPlanetsContext);

  useEffect(() => {
    const updatedColumns = COLUMNS.filter((column) => (
      !numericFilters.some((filter) => filter.column === column)
    ));
    setValidColumns(updatedColumns);
    setFormData((prevForm) => ({
      ...prevForm,
      column: updatedColumns[0],
    }));
  }, [numericFilters]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNumericFilter(formData);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <select
        name="column"
        data-testid="column-filter"
        value={ formData.column }
        onChange={ handleChange }
      >
        {
          validColumns.map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))
        }
      </select>
      <select
        name="operator"
        data-testid="comparison-filter"
        value={ formData.operator }
        onChange={ handleChange }
      >
        {OPERATORS.map((operator) => (
          <option key={ operator } value={ operator }>{operator}</option>
        ))}
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ formData.value }
        onChange={ handleChange }
      />
      <button type="submit" data-testid="button-filter">Filtrar</button>
    </form>
  );
}

export default NumericFilterForm;
