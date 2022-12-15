// Migración a Axios:
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        // language: 'es-VE'
    }
});

// Utils

// Solicitud de Peliculas para mostrar en una section o article
function createMovies(movies, container) {

    // Borramos todo lo que se encuentra en el section
    container.innerHTML = "";

    // Recorremos el array movies para mostrar las movies en el HTML con un section/article, div e img
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('movie-container');

        // Agregando el evento de click al 'movie-container' para irnos a la vista detallada de una pelicula
        div.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const img = document.createElement('img');
        img.classList.add('movie-img');

        // Agregamos la url a la img
        img.src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
        // Agregamos el alt a la img
        img.alt = movie.title;

        // Agregamos la img al div
        div.appendChild(img);

        // Agregamos el div al section
        container.appendChild(div);
    });
}

// Solicitud de Categorias para mostrar en una section o article
function createCategories(categories, container) {

    // Borramos todo lo que se encuentra en el article
    container.innerHTML = "";

    // Recorremos el array categories para mostrar las categorias en el HTML con un article, div e h3
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('category-container');

        const h3 = document.createElement('h3');
        h3.classList.add('category-title');

        // Agregamos el id a la categoria en el h3
        h3.id = 'id' + category.id;

        // Al h2 (categoryTitle) le agregaremos un addEventListener para que al hacer click en el h3 se muestre la lista de peliculas de la categoria seleccionada
        h3.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        // Agregamos el nombre de la categoria en el h3
        h3.textContent = category.name;

        // Agregamos la h3 al div
        div.appendChild(h3);

        // Agregamos el div al article
        container.appendChild(div);
    });
}

// Llamados a la API

// Solicitud de Treding para el Preview del Home
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    // console.log({data, movies})

    // Quiero recibir una pelicula en singular (movie) y entrar en el article trendingPreview-movieList y crear un div.movie-container e imagen por cada una de las peliculas.
    createMovies(movies, trendingMoviesPreviewList);
}

// Solicitud de Categorias para el Home
async function getCategoriesMoviesPreview() {
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
    // console.log({data, categories})

    // Vamos a recibir todas las categorias de peliculas disponibles en la API
    createCategories(categories, categoriesPreviewList);

}

// Solicitud de las peliculas por Categoria, llamamos esta funcion cada vez que entramos al categoriesPage
async function getMoviesByCategory(id) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    // console.log({data, movies})

    // Quiero recibir una pelicula en singular (movie) y entrar en la section genericListSection y crear un div.movie-container e imagen por cada una de las peliculas.
    createMovies(movies, genericListSection);
}

// Solicitud de las peliculas por Busqueda, llamamos esta funcion cada vez que entramos al searchPage
async function getMoviesBySearch(query) {
    const { data } = await api('/search/movie', {
        params: {
            query: query,
        },
    });
    const movies = data.results;

    // console.log({data, movies})

    createMovies(movies, genericListSection);
}

// Solicitud de la vista del Treding de peliculas
async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    // console.log({data, movies})

    // Quiero recibir una pelicula en singular (movie) y entrar en el article trendingPreview-movieList y crear un div.movie-container e imagen por cada una de las peliculas.

    createMovies(movies, genericListSection);
}

// Solicitud de la vista detallada de una pelicula
async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);   //data: movie es para axios, es un objeto data que renombrare movie

    // console.log(movie)

    // Cargamos el titulo, descripcion y rating de la pelicula en el HTML
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    // Cargamos las categorias de la pelicula
    const categories = movie.genres;
    createCategories(categories, movieDetailCategoriesList);

    // Cargamos la imagen de la pelicula
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    headerSection.style.backgroundImage = `
            linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.35) 19.27%,
                rgba(0, 0, 0, 0) 29.17%
                ),
        url(${movieImgUrl})
        `;
    headerSection.style.backgroundPosition = 'top';
    headerSection.style.backgroundRepeat = 'no-repeat';
    headerSection.style.backgroundSize = 'cover';

    // Cargar las peliculas relacionadas con la pelicula actual
    getRelatedMoviesId(id);
}

// Solicitud de las peliculas relacionadas con la pelicula pasada por Id
async function getRelatedMoviesId(id) {
    const { data } = await api('movie/' + id + '/similar');
    const relatedMovies = data.results;
    // console.log({data, relatedMovies})

    // Quiero recibir una pelicula en singular (movie) y entrar en la section genericListSection y crear un div.movie-container e imagen por cada una de las peliculas.
    createMovies(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0, 0);
}
