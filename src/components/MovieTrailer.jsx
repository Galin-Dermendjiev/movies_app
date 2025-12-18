import React, {useEffect, useState} from 'react'
import {fetchMovieTrailer} from "../api/tmdb.js";

const MovieTrailer = ({id}) => {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const loadTrailer = async () => {
            const key = await fetchMovieTrailer(id)
            console.log(key)
            if (key) setTrailerKey(key);
        };

        loadTrailer();
    }, [id]);

    if (!trailerKey)
        return (
            <div className="mt-10 text-center text-gray-300">
                <p>No trailer available</p>
            </div>
        );

    return (
        <section className="mt-10 max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-4">Movie Trailer</h2>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}
export default MovieTrailer
