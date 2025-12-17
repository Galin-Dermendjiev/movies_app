import React from 'react'
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

const SimilarMoviesSection = ({loadingSimilarMovies, similarMovies}) => {
    return (
        <>
            {loadingSimilarMovies && <Spinner />}

            {!loadingSimilarMovies && similarMovies?.length > 0 && (
                <section className="mt-16">
                    <div className="mx-auto max-w-[75%]">
                        <h2 className="mb-6">Similar Movies</h2>

                        <ul className="flex gap-5 overflow-x-auto pb-6 hide-scrollbar">
                            {similarMovies.map(movie => (
                                <li
                                    key={movie.id}
                                    className="min-w-[220px] max-w-[220px] shrink-0"
                                >
                                    <MovieCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </>
    )
}
export default SimilarMoviesSection
