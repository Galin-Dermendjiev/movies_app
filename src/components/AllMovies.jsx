import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

const AllMovies = ({initialLoading, errorMessage, movies, setPage, page, totalPages}) => {
    return (
        <section className="all-movies">
            <h2 className='mt-[40px]'>All movies</h2>

            {initialLoading && <Spinner/>}
            {!initialLoading && errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {!initialLoading && !errorMessage && (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={() => setPage(prev => prev + 1)}
                    hasMore={page < totalPages} // or calculate based on total pages
                    loader={<Spinner />}
                    scrollThreshold={0.8} // trigger at 80% of scroll
                    style={{ overflow: "hidden" }}
                >
                    <ul>
                        {movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
        </section>
    )
}
export default AllMovies
