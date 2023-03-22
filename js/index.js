// accessing html content
const continueContainer = document.querySelector(".continue");
const myListContainer = document.querySelector(".my-list");
const horrorContainer = document.querySelector(".horror");
const comedyContainer = document.querySelector(".comedy");
const dramaContainer = document.querySelector(".drama");
const actionContainer = document.querySelector(".action");

async function getMovies() {

    // fetching the JSON and catching error message
    try {
        const response = await fetch("/json/movies.json");
        const movies =  await response.json("/json/movies.json");

        console.log(movies);

     //looping list of movies and creating html
    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i].name)

        // adding continue watching section
        if (movies[i].watching === true) {
            continueContainer.innerHTML += `
            <div><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="continue__img" /></div>`;
        }

        // adding my list section 
        if (movies[i].myList === true) {
            myListContainer.innerHTML += `
            <div><a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
        }
    
        //filltering movies with specific genre
        const genre = movies[i].genre;
        const filteredGenre = genre.filter(filterGenre);

        function filterGenre(movie) {
            // adding horror section 
            if(movie.toLowerCase().includes("horror")) {
                return horrorContainer.innerHTML += `<div>
                    <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
            }

            // adding comedy section
            if(movie.toLowerCase().includes("comedy")) {
                return comedyContainer.innerHTML += `<div>
                <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
            }

            // adding drama section
            if(movie.toLowerCase().includes("drama") && dramaContainer !== null) {
                return dramaContainer.innerHTML += `<div>
                <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
            }

            // saw that there are not all movies displayed, so i added action section
            if(movie.toLowerCase().includes("action") && actionContainer !== null) {
                return actionContainer.innerHTML += `<div>
                <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
            }
        }  
    } 
    } catch (error) {
        console.log(error);
    }
}
getMovies();



  

