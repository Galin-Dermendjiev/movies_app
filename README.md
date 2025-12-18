# React Movie App

A modern movie web application built with **React** and **Vite** that fetches movies from **TMDB API**. Users can browse, search, and explore movies, view trailers, and discover trending movies based on user interactions.

## Features

- **Home Page**
    - Infinite scrolling for all movies
    - Search functionality to find movies
    - Trending section displaying the top 5 most viewed movies (tracked with **Appwrite**)

- **Movie Details Page**
    - Detailed information for each movie
    - Trailer section embedded via **YouTube**
    - Similar movies suggestions

- **User Interaction Tracking**
    - Number of clicks on movie cards is stored in **Appwrite** to generate trending movies

- **Routing**
    - Implemented using **React Router** for navigation between home and movie details pages

- **Styling**
    - Built with **Tailwind CSS** for responsive and modern design

- **Deployment**
    - Hosted on **Vercel** for easy and fast deployment

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **API:** TMDB API
- **Backend / Analytics:** Appwrite (for tracking movie clicks)
- **Deployment:** Vercel

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/react-movie-app.git
cd react-movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a .env.local file in the root:

VITE_TMDB_API_KEY= "your api key"  
VITE_APPWRITE_PROJECT_ID = "appwrite project id"   
VITE_APPWRITE_PROJECT_NAME = "appwrite project name"  
VITE_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"  

VITE_APPWRITE_DATABASE_ID = "appwrite database id"  
VITE_APPWRITE_TABLE = metrics  

## 5. Appwrite Setup

To track movie clicks for trending movies, set up a table in Appwrite:

1. Go to your **Appwrite Console** and select your project.  
2. Create a **TablesDB** table called `metrics` with the following columns:  

| Column      | Type    | Notes                             |
|------------|---------|----------------------------------|
| movie_id   | integer | Required                         |
| movie_title| string  | Required (for readability)       |
| poster_url | url     | Required                         |
| count      | integer | Default 1                        |

3. Add your **Vercel deployment URL** in **Settings → API → CORS** to allow your frontend to communicate with Appwrite.  

4. Run the development server:

 - npm run dev

## Usage 

**Browse movies on the homepage**

**Search for a specific movie using the search bar**

**Click on a movie card to view detailed information, watch the trailer, and see similar movies**

**Trending movies are displayed based on the number of clicks tracked in Appwrite**