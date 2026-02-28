import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

function App() {

  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endPoint = `${API_BASE_URL}/discover/movie`;
      const response = await fetch(endPoint, API_OPTIONS);
      const data = await response.json();

      if(data.response === 'false'){
        setErrorMessage(data.error || 'Failed to featch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies:  ${error}`);
      setErrorMessage("Error fetching movies. Please try again later");
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchingMovies();
  }, []);

  return (
    <section className='all-movies'>
      <h2>All movies</h2>

      {isLoading ? (<p>Loading...</p>
      ) : errorMessage ? (
            <p>{errorMessage}</p>
      ): (
        <ul>
          {moviesList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default App
