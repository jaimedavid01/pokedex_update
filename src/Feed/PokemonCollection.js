import React from "react";
import PokemonCard from "./PokemonCard";
import './Feed.css';


function PokemonCollection({ pokemon, loading }) {
  ///// Async data conditional
  if(loading) {
    return <h2>Loading...</h2>
  }
  /////Api data to individual cards
  const cards = pokemon.map((poke) => (
    <PokemonCard key={poke.id} pokemon={poke} />
  ));

  return <div className="cardsItem">{cards}</div>;
}

export default PokemonCollection;