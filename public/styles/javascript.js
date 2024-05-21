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














  
  
  
  /*let chnomfilm = document.querySelector("#nomfilm");
  let value = 1;
  for(let chnomfilm of retourAPIjson.name.common){

      let div = document.createElement('div');
      div.id = 'div-film-' + (value++);
      div.classList.add('film-tile');

      let titreFilm = document.createElement('h2');
      titreFilm.textContent = chnomfilm.name.common;


      div.appendChild(titreFilm);
      document.querySelector('#tuiles').appendChild(div);

  }*/















  /*document.addEventListener("DOMContentLoaded", function(){


    fetch('apiUrl').then(function (reponse){
      console.log ('données récupérées');
      reponse.json().then(function (data){
          console.log(data);
    
          let chnomfilm = document.querySelector("#nomfilm");
          let value = 1;
          for(let chnomfilm of data){

            let div = document.createElement('div');
            div.id = 'div-film-' + (value++);
            div.classList.add('film-tile');

            let titreFilm = document.createElement('h2');
            titreFilm.textContent = chnomfilm.title;


            div.appendChild(titreFilm);
            document.querySelector('#tuiles').appendChild(div);
        }
    }).catch(function (errortext){
        console.error(errortext);
    });
})

    console.log('Après fetch');
/*




    console.log('Avant fetch');
    let data2 = 0;
    fetch('apiUrl').then(function (reponse){
        console.log ('données récupérées');
        reponse.json().then(function (data){
            console.log(data);
    
            let chnomfilm = document.querySelector("#nomfilm");
            let value = 1;
            for(let chnomfilm of data){

            let div = document.createElement('div');
            div.id = 'div-film-' + (value++);
            div.classList.add('film-tile');

            let titreFilm = document.createElement('h2');
            titreFilm.textContent = chnomfilm.title;

            let dateFilm = document.createElement('p');
            dateFilm.textContent = chnomfilm.name.official;

            let genreFilm = document.createElement('p');
            genreFilm.textContent = chnomfilm.name.nativeName;


            div.appendChild(titreFilm);
            div.appendChild(dateFilm);
            div.appendChild(genreFilm);
            document.querySelector('#tuiles').appendChild(div);
            }
        })
    
    
        }).catch(function (errortext){
            console.error(errortext);
        });
    
        console.log('Après fetch');
        
        
        
        
        
        
        
        
        
        
        
        
        
        console.log('Avant fetch');
    let data2 = 0;
    fetch('https://restcountries.com/v3.1/all?fields=name').then(function (reponse){
        console.log ('données récupérées');
        reponse.json().then(function (data){
            console.log(data);
    
            let chnomfilm = document.querySelector("#nomfilm");
            let value = 1;
            for(let chnomfilm of data){

            let div = document.createElement('div');
            div.id = 'div-film-' + (value++);
            div.classList.add('film-tile');

            let titreFilm = document.createElement('h2');
            titreFilm.textContent = chnomfilm.name.common;

            let dateFilm = document.createElement('p');
            dateFilm.textContent = chnomfilm.name.official;

            let genreFilm = document.createElement('p');
            genreFilm.textContent = chnomfilm.name.nativeName;


            div.appendChild(titreFilm);
            div.appendChild(dateFilm);
            div.appendChild(genreFilm);
            document.querySelector('#tuiles').appendChild(div);
            }
        })
    
    
        }).catch(function (errortext){
            console.error(errortext);
        });
    
        console.log('Après fetch');*/

//    })
    










const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const movieListContainer = document.getElementById('tuiles');

                movies.forEach(movie => {

                    let div = document.createElement('div');
                    movieListContainer.appendChild(div);
                    
                    let poster = document.createElement('img');
                    poster.setAttribute('src', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path);
                    poster.setAttribute('alt', movie.title);
                    div.appendChild(poster);

                    const movieTitle = document.createElement('h2');
                    movieTitle.textContent = movie.title;
                    div.appendChild(movieTitle);

                    const movieDate = document.createElement('p');
                    movieDate.textContent = movie.release_date;
                    div.appendChild(movieDate);

                    const movieResume = document.createElement('p');
                    movieResume.textContent = movie.overview;
                    div.appendChild(movieResume);

                });
            })
            .catch(error => console.error('Erreur lors de la requête :', error));