
import React, { useEffect, useState } from "react";
import PokemonData from "./PokemonData";
import './Feed.css';


function PokemonCard({ pokemon, key, handleShowData}) {
  //// State management
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const { name, url } = pokemon;


  ///// Fetch Pokemon Stats
  function handleClick() {
    setLoading(true);
    const fetchPosts = async () => {
        const response = await fetch(url);
        const items = await response.json();
        return items;
    }
    
    fetchPosts().then(poke => {
        setData(poke)
        console.log(data)
        setShowData((showData) => !showData)
        });

    setLoading(false);
  }



  return (
    <div>
    <div className="card" key={key} onClick={handleClick}>
      <div>
        <h4>{name}</h4>
        {showData &&  <PokemonData data={data} loading={loading}/> }
      </div>
    </div>

    </div>

  );
}


       


export default PokemonCard;