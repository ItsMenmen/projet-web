// Fonction pour effectuer une recherche de films
async function searchMovies(query) {
    const apiKey = '049db6c77575ff540a76d80746b13585';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=$
   {query}`;
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results; // Renvoie les résultats de la recherche
    } catch (error) {
    console.error('Erreur lors de la recherche de films :', error);
    }
   }
   // Exemple d'utilisation de la fonction de recherche
   const results = await searchMovies('Spider-Man');
   console.log(results); // Affiche les résultats de la recherche dans la console
   