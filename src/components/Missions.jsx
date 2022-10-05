import React, { Component } from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends Component {
  render() {
    const missionElements = missions.map(({ name, year, country, destination }) => (
      <MissionCard
        key={ name }
        name={ name }
        year={ year }
        country={ country }
        destination={ destination }
      />
    ));

    return (
      <section data-testid="missions">
        <Title headline="Missões" />
        <div className="flex wrap">
          {missionElements}
        </div>
      </section>
    );
  }
}

export default Missions;
