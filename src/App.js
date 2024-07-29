import { useState, useEffect } from "react";
import MovieCard from "./moviecard";
import './App.css';
import SearchIcon from './search.svg';
const API_URL = 'http://omdbapi.com?apikey=9744ad30';

const movie1 = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false)

    const searchMovies = async (title) => {
        setLoading(true)
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMovies(data.Search);
        setLoading(false)
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>Movieland</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => { searchMovies(searchTerm) }} />
            </div>
            {loading ?
                <div className="h-96 grid grid-cols-3 w-full gap-20 px-56 mt-20">
                    <div className="animate-pulse rounded-xl bg-slate-800">
                    </div>
                    <div className="animate-pulse rounded-xl bg-slate-800">
                    </div>
                    <div className="animate-pulse rounded-xl bg-slate-800">
                    </div>
                </div>
                :
                <>
                    {movies?.length > 0

                        ? (<div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>) : (<div className="empty">
                            <h2>No movies found</h2>
                        </div>)
                    }
                </>
            }
        </div>
    );
}
export default App;
