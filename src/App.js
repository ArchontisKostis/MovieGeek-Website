// React Imports
import React from "react";
import {useEffect, useState} from "react";
import MovieCard from "./movieCard";

// Stylesheet & assets Imports
import './App.css';
import SearchIcon from "./search.svg";

const API_URL = 'https://www.omdbapi.com/?apikey=75ff6d03'

const movie1 = {
    "Title": "Ice Age 2: The Meltdown",
    "Year": "2006",
    "imdbID": "tt0438097",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAwODg3OTAxMl5BMl5BanBnXkFtZTcwMjg2NjYyMw@@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Search Movies Function
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Ice Age');
    }, []);

    return (
        <div className="app">
            <h1>MovieGeek</h1>

            <div className="search">
                <input 
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <img
                    src={SearchIcon}
                    alt="searchIcon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {// IF
            movies?.length > 0
            ? (
                <div className="container">
                    {
                        movies.map( (movie) => (
                            <MovieCard movie={movie}/>
                        ))
                    }
                </div>
            ) 
            // ELSE
            : (
                <div className="empty">
                    <h2>Sorry! No movies found!</h2>
                </div>
            )}

            

        </div>
    );
}

export default App;