import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const limit = 8;

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * limit}&limit=${limit}`)
      .then(async response => {
        const fetchedPokemons = await Promise.all(response.data.results.map(async (pokemon: Pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return {
            name: pokemonData.data.name,
            sprites: pokemonData.data.sprites
          };
        }));
        setPokemons(fetchedPokemons);
        setTotalPages(Math.ceil(response.data.count / limit));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      });
  }, [currentPage]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <h3>{pokemon.name}</h3>
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">See Details</Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    </div>
  );
};

export default PokemonList;
