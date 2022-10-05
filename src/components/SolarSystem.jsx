import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    const planetElements = planets.map(({ name, image }) => (
      <PlanetCard key={ name } planetName={ name } planetImage={ image } />
    ));

    return (
      <section data-testid="solar-system">
        <Title headline="Planetas" />
        <div className="flex wrap center planets-container">
          {planetElements}
        </div>
      </section>
    );
  }
}

export default SolarSystem;
