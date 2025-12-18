import React from 'react'
import { Link } from 'react-router-dom'
import {incrementMovieCount} from "../appwrite.js";

const MovieCard = ({ movie }) => {
    const {title, vote_average, poster_path, release_date, original_language, id} = movie

    const handleClick = () => {
        const key = `movie_interest_${id}`
        if (sessionStorage.getItem(key)) return

        sessionStorage.setItem(key, '1')
        incrementMovieCount({movie})
    }


    return (<div className="movie-card">
        <Link to={`/movie/${id}`} onClick={handleClick}>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/No-Poster.png'} alt={title} />
        <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src='/star.svg' alt='star icon' />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
        </Link>
    </div>)
}
export default MovieCard
