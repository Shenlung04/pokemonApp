import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h2>Welcome to the Pokemon App!</h2>
            <Link to="/pokemon-list" className="pokemon-list-button">
                Go to Pokemon List
            </Link>
        </div>
    );
};

export default Home;
