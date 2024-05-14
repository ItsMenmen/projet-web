const apiKey = '049db6c77575ff540a76d80746b13585';
let query = ''; 


const searchButton = document.querySelector('.bouton');

searchButton.addEventListener('click', function () {
    // Récupérez la valeur de la barre de recherche
    const searchQuery = document.querySelector('#site-search').value;

    query = searchQuery;

    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
});
