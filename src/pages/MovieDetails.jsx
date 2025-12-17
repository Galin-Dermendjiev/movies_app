import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchMovieById, fetchSimilarMovies} from "../api/tmdb.js";
import Spinner from "../components/Spinner.jsx";
import {Link} from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const [similarMovies, setSimilarMovies] = useState([]);
    const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(false);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                setLoading(true);
                const movie = await fetchMovieById(id);
                setMovie(movie);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const loadSimilarMovies = async () => {
            try {
                setLoadingSimilarMovies(true);
                const data = await fetchSimilarMovies(id)
                setSimilarMovies(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch similar movies", error);
            } finally {
                setLoadingSimilarMovies(false);
            }
        }

        loadMovie();
        loadSimilarMovies();
    }, [id]);

    if (loading) return <Spinner />;

    return (
        <div className="movie-details">
            {/* Back to Home button */}
            <div className="mt-4 max-w-6xl mx-auto px-4 md:px-0">
                <Link to="/" className="home-button">
                    ← Back to Home
                </Link>

            </div>
            {/* Backdrop */}
            <div
                className="movie-backdrop"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            ></div>

            {/* Main content */}
            <div className="movie-main">
                {/* Poster */}
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/No-Poster.png"
                    }
                    alt={movie.title}
                    className="movie-poster"
                />

                {/* Details */}
                <div className="movie-info">
                    <div className="movie-title">
                        <h1>{movie.title}</h1>
                        {movie.tagline && <p>{movie.tagline}</p>}
                    </div>

                    <div className="movie-meta">
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>•</span>
                        <span>{movie.release_date?.split("-")[0]}</span>
                        <span>•</span>
                        <span>{movie.runtime} min</span>
                    </div>

                    {/* Genres */}
                    <div className="movie-genres">
                        {movie.genres?.map((genre) => (
                            <span key={genre.id}>{genre.name}</span>
                        ))}
                    </div>

                    {/* Overview */}
                    <p className="movie-overview">{movie.overview}</p>

                    {/* Production Companies */}
                    {movie.production_companies?.length > 0 && (
                        <div className="movie-production">
                            <h2>Production Companies</h2>
                            <div className="production-list">
                                {movie.production_companies.map((company) => (
                                    <div key={company.id} className="production-item">
                                        {company.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                                alt={company.name}
                                            />
                                        )}
                                        <span>{company.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages & Countries */}
                    <div className="movie-languages-countries">
                        <div className="languages">
                            <span>Languages</span>
                            {movie.spoken_languages?.map((lang) => (
                                <span key={lang.iso_639_1}>{lang.english_name}</span>
                            ))}
                        </div>
                        <div className="countries">
                            <span>Production Countries</span>
                            {movie.production_countries?.map((c) => (
                                <span key={c.iso_3166_1}>{c.name}</span>
                            ))}
                        </div>
                    </div>

                    {/* Homepage button */}
                    {movie.homepage && (
                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="movie-homepage">
                            Visit Official Site
                        </a>
                    )}
                </div>
            </div>

            {/* Similar Movies */}
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
        </div>
    );
};

export default MovieDetails;
