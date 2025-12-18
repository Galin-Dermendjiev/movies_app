import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchMovieById, fetchSimilarMovies} from "../api/tmdb.js";
import Spinner from "../components/Spinner.jsx";
import {Link} from "react-router-dom";
import SimilarMoviesSection from "../components/SimilarMoviesSection.jsx";
import MainMovieContent from "../components/MainMovieContent.jsx";
import MovieTrailer from "../components/MovieTrailer.jsx";

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
            <MainMovieContent movie={movie} />

            <MovieTrailer id={id} />

            <SimilarMoviesSection loadingSimilarMovies={loadingSimilarMovies} similarMovies={similarMovies} />
        </div>
    );
};

export default MovieDetails;
