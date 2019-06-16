export const getStatTranslation = statName => {
  const translations = {
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    hp: 'Health',
    'special-attack': 'Super Attack',
    'special-defense': 'Super Defense',
  };

  return translations[statName];
};