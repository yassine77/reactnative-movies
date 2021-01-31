// API/TMDBApi.js

const API_TOKEN = "09294284933d6ea3fd2e95dc494c6480";

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' 
    + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }