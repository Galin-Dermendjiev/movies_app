import React from 'react'
import {Link} from "react-router-dom";

const TrendingMovies = ({trendingMovies}) => {
    return (
        <>
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
        </>
    )
}
export default TrendingMovies
