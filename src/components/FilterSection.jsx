import React, { useContext } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';
import NameFilterForm from './NameFilterForm';
import NumericFilterForm from './NumericFilterForm';
import SortForm from './SortForm';

function FilterSection() {
  const { numericFilters, removeFilter, removeAllFilters } = useContext(SWPlanetsContext);

  return (
    <section>
      <NameFilterForm />
      <div>
        <NumericFilterForm />
        {
          numericFilters.map((filter, index) => (
            <div data-testid="filter" key={ `filter-${index}` }>
              <span>{Object.values(filter).join(' ')}</span>
              <button
                type="button"
                onClick={ () => removeFilter(filter.column) }
              >
                x
              </button>
            </div>
          ))
        }
      </div>
      <SortForm />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>
    </section>
  );
}

export default FilterSection;
