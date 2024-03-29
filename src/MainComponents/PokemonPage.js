import React, { useEffect, useState } from "react";
import PokemonCollection from "../Feed/PokemonCollection";
import ReactPaginate from 'react-paginate';
import './PokemonPage.css';
import {BrowserRouter as Router, Route, Switch, Link, useParams} from "react-router-dom";


function PokemonPage() {
  ///// Data States  
  const [fullData, setFullData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  ///// Pagination States
  const [pageNumberLimit, setpageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const { pageNumber } = useParams();
  const perPage = 25;
  const initialOffSet = (pageNumber - 1) * perPage;
  console.log(pageNumber)
  ////Fetch All Pokemons from API
  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${initialOffSet}&limit=${perPage}`);
      const items = await response.json();
      setLoading(false);
      console.log(items)
      return items;
    }
    
    fetchPosts().then(poke => {
        setFullData(poke)
        setTotalPages(Math.ceil(poke.count / perPage))
        setPokemon(poke.results)
  
  })}, []);

  //// Change page
  function paginate(number) {
    setLoading(true);
    setCurrentPage(number + 1)
    console.log("pageNumber", number)

    let offset = 0
    offset = (number - 1) * perPage;

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${perPage}`)
    .then(r => r.json())
    .then(data => {
      console.log("data", data)
      setPokemon(data.results)
    })

    setLoading(false);
  };

    ///// Create pages array
    const pages = [];
      for(let i = 1; i <= totalPages; i++){
      pages.push(i)
    }

    ////// Create pages list
    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return (

                <li key={number} id={number} >
                    <Link to={'/' + number} onClick={() => paginate(number)}>
                    {number}
                    </Link>
                </li>
            )
        } else {
      return null;
    };
        
    });

    //////Next & Prev Buttons
    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1)
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }

        paginate(currentPage);
      };
    
      const handlePrevbtn = () => {
        setCurrentPage(currentPage - 2)

    
        if ((currentPage - 1) % pageNumberLimit == 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        paginate(currentPage);
      };

  return (

    <div className="App" >
    
    <h1>POKEDÉX</h1>

    <PokemonCollection 
        pokemon={pokemon} 
        loading={loading}/>

        <ul className="pageNumbers">
            <li>
            <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
            >Prev</button>
            </li>
            {renderPageNumbers}
            <li>
            <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
            >Next</button>
            </li>
        </ul>
    </div>

  );
}

export default PokemonPage;