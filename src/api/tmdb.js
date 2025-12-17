import {updateSearchCount} from "../appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`,
    },
}

export const fetchMovies = async (query = '', page = 1) => {
    const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`

    const response = await fetch(endpoint, API_OPTIONS)

    if (!response.ok) {
        throw new Error('Failed to fetch movies from API')
    }

    const data = await response.json()

    if(query && data.results.length > 0){
        await updateSearchCount({searchTerm: query, movie: data.results[0]})
    }
    return {
        results: data.results || [],
        totalPages: data.total_pages
    }
}

export const fetchMovieById = async (id) => {
    const endpoint = `${API_BASE_URL}/movie/${id}`

    const response = await fetch(endpoint, API_OPTIONS)

    if (!response.ok) {
        throw new Error('Failed to fetch movie by id')
    }

    const data = await response.json()

    return data || []
}