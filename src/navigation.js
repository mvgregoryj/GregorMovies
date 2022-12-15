// Botones:
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});


// Llamado a arrowBtn al darle click te devuelva a la pagina anterior siempre y cuando se mantenga en el mismo dominio, si no es el mismo dominio ir al home
window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        // Agregando un estado de carga inical
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);

// Back to the previous page but always in the same domain URL.
arrowBtn.addEventListener('click', () => {

    headerSection.style = '';

    // Si history.state NO es null, a stateLoad se le asigna history.state.loadUrl y si SI es null es porque no hay mas paginas en el historial entonces stateLoad se le asigna ''
    const stateLoad = history.state ? history.state.loadUrl : '';

    if (stateLoad.includes('#')) {
        location.hash = '#home';
    } else {
        history.back();
    }
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

// Funcion que voy a llamar cuando cargue mi app y cuando cambie el hash de la url
function navigator() {
    // console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if ( location.hash.startsWith('#search=')) {
        searchPage();
    } else if ( location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if ( location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        // Aqui pudieramos tener una pagina 404 NOT FOUND
        homePage();
    }

    // Siempre que cambie el hash de la url, se va a ejecutar esta funcion
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Funciones de cada page:
function homePage() {
    // console.log('HOME!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgorund = '';

    // Quitar o poner inactive
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}

function categoriesPage() {
    // console.log('CATEGORIES!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgroundImage = '';

    // Quitar o poner inactive
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // Obteniendo el id de la categoria
    const [_, categoryData] = location.hash.split('='); // ['#category', 'id-name']
    var [categoryId, categoryName] = categoryData.split('-'); // ['id', 'name']

    // Cambiar titulo de la categoria
    categoryName = categoryName.replaceAll('%20', ' ');
    headerCategoryTitle.textContent = categoryName;

    getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    // console.log('MOVIE!!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.backgorund = ''; // Aqui iria la imagen de la pelicula

    // Quitar o poner inactive
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // Obteniendo el id de la pelicula
    const [_, movieId] = location.hash.split('='); // ['#movie', 'id']

    // Llamada a la funcion asincrona
    getMovieById(movieId);
}

function searchPage() {
    // console.log('SEARCH!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgorund = '';

    // Quitar o poner inactive
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // Obteniendo el id de la categoria
    const [_, query] = location.hash.split('='); // ['#search', 'platzi']

    getMoviesBySearch(query);
}

function trendsPage() {
    // console.log('TRENDS!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgorund = '';

    // Quitar o poner inactive
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.textContent = 'Trending';
    // headerCategoryTitle.innerHTML = 'Trending';

    getTrendingMovies();
}