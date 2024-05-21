const apiKey = '049db6c77575ff540a76d80746b13585';
let query = ''; 

const searchButton = document.querySelector('.bouton');







searchButton.addEventListener('click', function () {
    
    // Récupérez la valeur de la barre de recherche
    const searchQuery = document.querySelector('#site-search').value;
    query = searchQuery;
    
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=false&language=fr-FR&page=1`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            clearResults();
            displayMovies(data.results);
        })
    });
    
       
    
                    
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&include_adult=false&language=fr-FR&page=1';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        displayMovies(data.results);
    })


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
        poster.setAttribute('alt', movie.title);div.appendChild(poster);

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
    
    
    
    
