const apiKey = '049db6c77575ff540a76d80746b13585';
let query = '';

const searchButton = document.querySelector('.bouton');
const genreButton = document.querySelector('#genre-button');
const genreSelect = document.querySelector('#genre-select');
const yearSelect = document.querySelector('#year-select');
const actorInput = document.querySelector('#actor-input');
const directorInput = document.querySelector('#director-input');

function clearResults() {
    const movieListContainer = document.getElementById('tuiles');
    movieListContainer.innerHTML = '';
}

function displayMovies(movies) {
    const movieListContainer = document.getElementById('tuiles');
    movies.forEach(movie => {
        let div = document.createElement('div');
        movieListContainer.appendChild(div);

        let poster = document.createElement('img');
        poster.setAttribute('src', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path);
        poster.setAttribute('alt', movie.title);
        
        div.appendChild(poster);

        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('movieTitle');
        movieTitle.textContent = movie.title;
        div.appendChild(movieTitle);

        const movieDate = document.createElement('p');
        movieDate.classList.add('movieDate');
        movieDate.textContent = movie.release_date;
        div.appendChild(movieDate);

        const movieResume = document.createElement('p');
        movieResume.classList.add('movieResume');
        movieResume.textContent = movie.overview;
        div.appendChild(movieResume);
    });
}

async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        alert('Erreur lors de la récupération des films. Veuillez réessayer plus tard.');
    }
}

async function loadRecentMovies() {
    const recentMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=1`;
    const movies = await fetchMovies(recentMoviesUrl);
    if (movies) {
        clearResults();
        displayMovies(movies);
    }
}

async function loadGenres() {
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`;
    try {
        const response = await fetch(genresUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const genres = data.genres;
        genres.forEach(genre => {
            let option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des genres :', error);
        alert('Erreur lors de la récupération des genres. Veuillez réessayer plus tard.');
    }
}

function loadYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

async function fetchActorId(actorName) {
    const searchActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${actorName}&language=fr-FR`;
    try {
        const response = await fetch(searchActorUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const actor = data.results.find(person => person.known_for_department === 'Acting');
        if (actor) {
            return actor.id;
        } else {
            throw new Error('Aucun acteur trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de l\'acteur :', error);
        alert('Erreur lors de la récupération de l\'acteur. Veuillez réessayer plus tard.');
    }
}

async function fetchDirectorId(directorName) {
    const searchDirectorUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${directorName}&language=fr-FR`;
    try {
        const response = await fetch(searchDirectorUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const director = data.results.find(person => person.known_for_department === 'Directing');
        if (director) {
            return director.id;
        } else {
            throw new Error('Aucun réalisateur trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID du réalisateur :', error);
        alert('Erreur lors de la récupération de l\'ID du réalisateur. Veuillez réessayer plus tard.');
    }
}

searchButton.addEventListener('click', async function () {
    const searchQuery = document.querySelector('#site-search').value.trim();
    if (searchQuery) {
        query = searchQuery;
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=fr-FR`;
        const movies = await fetchMovies(searchUrl);
        if (movies) {
            clearResults();
            displayMovies(movies);
        }
    } else {
        alert('Veuillez entrer un terme de recherche.');
    }
});

genreButton.addEventListener('click', async function () {
    const selectedGenre = genreSelect.value;
    const selectedYear = yearSelect.value;
    const actorName = actorInput.value.trim();
    const directorName = directorInput.value.trim();

    let genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR`;

    if (selectedGenre) {
        genreUrl += `&with_genres=${selectedGenre}`;
    }

    if (selectedYear) {
        genreUrl += `&primary_release_year=${selectedYear}`;
    }

    if (actorName) {
        try {
            const actorId = await fetchActorId(actorName);
            genreUrl += `&with_cast=${actorId}`;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'ID de l\'acteur :', error);
            return;
        }
    }

    if (directorName) {
        try {
            const directorId = await fetchDirectorId(directorName);
            genreUrl += `&with_crew=${directorId}`;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'ID du réalisateur :', error);
            return;
        }
    }

    const movies = await fetchMovies(genreUrl);
    if (movies) {
        clearResults();
        displayMovies(movies);
    }
});

// Charger les
// Charger les films récents, les genres et les années au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    loadRecentMovies();
    loadGenres();
    loadYears();
});