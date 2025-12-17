import Search from "../components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner.jsx";
import MovieCard from "../components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies} from "../appwrite.js";
import {fetchMovies} from "../api/tmdb.js";
import {Link} from "react-router-dom";


function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [initialLoading, setInitialLoading] = useState(false)
    const [movies, setMovies] = useState([])

    const [trendingMovies, setTrendingMovies] = useState([])
    const [page, setPage] = useState(1)

    const [loadingMore, setLoadingMore] = useState(false)

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    useEffect(() => {
        const loadTrending = async () => {
            const popularMovies = await getTrendingMovies();
            setTrendingMovies(popularMovies);
        };

        loadTrending();
    }, []);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                if (page === 1) {
                    setInitialLoading(true); // first page
                } else {
                    setLoadingMore(true); // subsequent pages
                }
                setErrorMessage('')
                const results = await fetchMovies(debouncedSearchTerm, page)

                setMovies(prevMovies => {
                    // Filter out duplicates by movie ID
                    const newMovies = results.filter(
                        newMovie => !prevMovies.some(movie => movie.id === newMovie.id)
                    );
                    return [...prevMovies, ...newMovies];
                });
            } catch (error) {
                console.log("Error fetching movies", error)
                setErrorMessage('Error fetching movies please try again later')
            } finally {
                setInitialLoading(false)
                setLoadingMore(false)
            }
        }

        loadMovies()
    }, [debouncedSearchTerm, page])

    useEffect(() => {
        setMovies([])
        setPage(1)
    }, [debouncedSearchTerm])

    return (<main>
        <div className="pattern"/>
        <div className="wrapper">
            <header>
                <img src='../public/hero-img.png' alt='hero'/>
                <h1>Find <span className="text-gradient">movies</span> you'll enjoy fast and easy</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            {trendingMovies.length > 0 && (
                <section className="trending">
                    <h2>Trending Movies</h2>
                    <ul>
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p> {index + 1}</p>
                                <Link to={`/movie/${movie.movie_id}`}>
                                    <img src={movie.poster_url} alt={movie.title} className='scale'/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="all-movies">
                <h2 className='mt-[40px]'>All movies</h2>

                {initialLoading && <Spinner/>}
                {!initialLoading && errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <ul>
                    {movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </ul>

                {loadingMore && <Spinner/>}

                {!initialLoading && (
                    <button
                        className='home-button mt-10'
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={loadingMore}
                    >
                        {loadingMore ? 'Loading...' : 'Load more'}
                    </button>
                )}
            </section>
        </div>
    </main>)
}

export default Home
