import Search from "../components/Search.jsx";
import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import {getTrendingMovies} from "../appwrite.js";
import {fetchMovies} from "../api/tmdb.js";
import TrendingMovies from "../components/TrendingMovies.jsx";
import AllMovies from "../components/AllMovies.jsx";


function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [initialLoading, setInitialLoading] = useState(false)
    const [movies, setMovies] = useState([])

    const [trendingMovies, setTrendingMovies] = useState([])
    const [page, setPage] = useState(1)

    const [totalPages, setTotalPages] = useState(5)

    const [selectedGenre, setSelectedGenre] = useState('')

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
                }
                setErrorMessage('')
                const {results, totalPages} = await fetchMovies(debouncedSearchTerm, page, selectedGenre)
                setTotalPages(totalPages)
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
            }
        }

        loadMovies()
    }, [debouncedSearchTerm, page, selectedGenre])

    useEffect(() => {
        setMovies([])
        setPage(1)
        setTotalPages(1)
        setSelectedGenre('')
    }, [debouncedSearchTerm])

    useEffect(() => {
        setMovies([])
        setPage(1)
        setTotalPages(1)
    }, [selectedGenre])

    return (<main>
        <div className="pattern"/>
        <div className="wrapper">
            <header>
                <img src='/hero-img.png' alt='hero'/>
                <h1>Find <span className="text-gradient">movies</span> you'll enjoy fast and easy</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            <TrendingMovies trendingMovies={trendingMovies}/>

            <AllMovies movies={movies}
                       page={page}
                       setPage={setPage}
                       totalPages={totalPages}
                       errorMessage={errorMessage}
                       initialLoading={initialLoading}
                       selectedGenre={selectedGenre}
                       setSelectedGenre={setSelectedGenre}
                       debouncedSearchTerm={debouncedSearchTerm}/>
        </div>
    </main>)
}

export default Home
