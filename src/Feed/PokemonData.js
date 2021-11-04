import React, { useState } from "react";
import './Feed.css';


function PokemonData({ data, loading }) {
  //// Async data conditional
  if(loading) { return <p>Loading...</p>}

  ///// Data deconstruction
  const { name, sprites, stats, weight, types } = data;

  return (
    <div className="popup">
      <div className="center">
        <img src={sprites.front_default} alt={name} />
        <h4>{name}</h4>
      </div>

    <p>Type: {types[0].type.name}</p>
    <p>Stats:</p>
    <ul>
      <li>HP: {stats[0].base_stat}</li>
      <li>Attack: {stats[1].base_stat}</li>
      <li>Defense: {stats[2].base_stat}</li>
      <li>Special Attack: {stats[3].base_stat}</li>
      <li>Special Defense: {stats[4].base_stat}</li>
      <li>Speed: {stats[5].base_stat}</li>
    </ul>
      <p>Weight: {weight}lbs</p>
  </div>
);

}


       


export default PokemonData;


