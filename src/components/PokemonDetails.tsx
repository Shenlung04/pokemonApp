import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Pokemon {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: Array<{
        type: {
            name: string;
        };
    }>;
}

const PokemonDetail: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                setPokemon(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Pokémon details:', error);
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pokemon) {
        return <div>Pokémon not found</div>;
    }

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h4>Type:</h4>
            <ul>
                {pokemon.types.map((typeInfo) => (
                    <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                ))}
            </ul>
            <p>Height: {pokemon.height} dm</p>
            <p>Weight: {pokemon.weight} hg</p>
            <button className="back-button" onClick={() => navigate('/pokemon-list')}>
                Back to Pokemon List
            </button>
        </div>
    );
};

export default PokemonDetail;
