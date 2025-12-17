import {Client, ID, Query, TablesDB} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TABLE_ID = 'metrics'
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID)

const tables = new TablesDB(client)

export const updateSearchCount = async ({searchTerm, movie}) => {
    try {
        const result = await tables.listRows({
            databaseId: DATABASE_ID, tableId: TABLE_ID, queries: [
                Query.equal("searchTerm", searchTerm)
            ]
        })
        if (result.rows.length > 0) {
            const row = result.rows[0]
            await tables.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: row.$id,
                data: {count: row.count + 1}
            })
        } else {
            await tables.createRow({
                databaseId: DATABASE_ID, tableId: TABLE_ID, rowId: ID.unique(), data: {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export const getTrendingMovies = async () => {
    try {
        const movies = await tables.listRows({databaseId: DATABASE_ID, tableId: TABLE_ID, queries: [
            Query.orderDesc('count'),
            Query.limit(5)
            ]})
        return movies.rows
    } catch (e) {
        console.log(e)
    }
}