import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetails';
import PokemonList from './components/PokemonList';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
      </Routes>
    </Router>
  );
};

export default App;
