const apiKey = '049db6c77575ff540a76d80746b13585';
const query = 'Jack Reacher';
const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

// Utilisez fetch ou une autre méthode pour récupérer les données depuis apiUrl
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Traitez les données ici (par exemple, affichez les résultats dans votre interface utilisateur)
    console.log(data.results);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  });
