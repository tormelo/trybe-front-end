import React, { useContext, useState } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';
import { COLUMNS, SORT_OPERATORS } from '../helpers/constants';

function SortForm() {
  const [formData, setFormData] = useState({
    column: COLUMNS[0],
    order: SORT_OPERATORS[0],
  });

  const { updateSortSettings } = useContext(SWPlanetsContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSortSettings(formData);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <select
        name="column"
        data-testid="column-sort"
        value={ formData.column }
        onChange={ handleChange }
      >
        {
          COLUMNS.map((column) => (
            <option key={ `sort-${column}` } value={ column }>{column}</option>
          ))
        }
      </select>
      <div>
        {
          SORT_OPERATORS.map((operator) => (
            <label htmlFor={ `radio-btn-${operator}` } key={ `radio-${operator}` }>
              <input
                type="radio"
                name="order"
                data-testid={ `column-sort-input-${operator.toLowerCase()}` }
                id={ `radio-btn-${operator}` }
                checked={ operator === formData.order }
                value={ operator }
                onChange={ handleChange }
              />
              {operator}
            </label>
          ))
        }
      </div>
      <button type="submit" data-testid="column-sort-button">Ordenar</button>
    </form>
  );
}

export default SortForm;
