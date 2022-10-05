import React, { useContext } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';

function Table() {
  const { filteredPlanets, planetProperties } = useContext(SWPlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          {
            planetProperties.map((property) => (
              <th key={ property }>{property}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {
                Object.entries(planet).map(([key, value], index) => (
                  <td
                    key={ `${planet.name}-col-${index}` }
                    data-testid={ `planet-${key}` }
                  >
                    {value}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
