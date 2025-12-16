import './App.css'
import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {fetchMovies} from "./api/tmdb.js";


function App() {
    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(() =>setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true)
                setErrorMessage('')
                const results = await fetchMovies(debouncedSearchTerm)
                setMovies(results)
            } catch (error) {
                console.log("Error fetching movies", error)
                setErrorMessage('Error fetching movies please try again later')
            } finally {
                setLoading(false)
            }
        }

        loadMovies()
    }, [debouncedSearchTerm])

    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm]);
    return (<main>
        <div className="pattern"/>
        <div className="wrapper">
            <header>
                <img src='../public/hero-img.png' alt='hero'/>
                <h1>Find <span className="text-gradient">movies</span> you'll enjoy fast and easy</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>
            <section className="all-movies">
                <h2 className='mt-[40px]'>All movies</h2>
                {loading ? (<Spinner/>) : errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : (<ul>
                    {movies.map(movie => (<MovieCard movie={movie} key={movie.id}/>))}
                </ul>)}
            </section>
        </div>
    </main>)
}

export default App
