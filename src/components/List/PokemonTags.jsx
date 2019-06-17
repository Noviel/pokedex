import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Tag } from '../ui/Tag';

import { useStore } from '../StoreContext';

const PokemonTags = observer(({ name }) => {
  const store = useStore();
  const pokemon = store.getPokemon(name);

  return (
    <div>
      {pokemon.types.map(({ name }) => {
        const tagInfo = store.allTags[name];
        const displayName = (tagInfo && tagInfo.names[6].name) || name;
        return <Tag key={name} label={displayName} />;
      })}
    </div>
  );
});

PokemonTags.propTypes = {
  name: PropTypes.string,
};

export { PokemonTags };
