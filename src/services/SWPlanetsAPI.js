const PLANETS_ENDPOINT = 'https://swapi.dev/api/planets';

const fetchSWPlanets = async () => {
  const response = await fetch(PLANETS_ENDPOINT);
  const { results } = await response.json();
  return results.map((planet) => {
    const { residents, ...remainingObject } = planet;
    return remainingObject;
  });
};

export default fetchSWPlanets;
