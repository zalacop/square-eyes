// accessing html content
const continueContainer = document.querySelector(".continue");
const myListContainer = document.querySelector(".my-list");
const horrorContainer = document.querySelector(".horror");
const comedyContainer = document.querySelector(".comedy");
const dramaContainer = document.querySelector(".drama");
const actionContainer = document.querySelector(".action");


//creating the API url (http://localhost:10004/wp-json/wc/store/products)

const localHost = "http://localhost:10004";
const woocommerce = "/wp-json/wc/store";
const products ="/products"; 

const url = localHost + woocommerce + products;


async function getMovies() {

   // fetching the JSON and catching error message
   
   try {
    const response = await fetch(url);
    const movies = await response.json();

    console.log(movies);

    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i].name);

        // adding continue watching section
            continueContainer.innerHTML = `
            <div><a href="/films/watch.html"><img src="${movies[2].images[0].src}" alt="Poster for ${movies[2].name}" class="continue__img" /></a></div>
            <div><a href="/films/watch.html"><img src="${movies[5].images[0].src}" alt="Poster for ${movies[5].name}" class="continue__img" /></a></div>
            <div><a href="/films/watch.html"><img src="${movies[7].images[0].src}" alt="Poster for ${movies[7].name}" class="continue__img" /></a></div>`;

        // adding my list section 
            myListContainer.innerHTML = `
            <div><a href="/films/movie.html?movie=${movies[0].id}"><img src="${movies[0].images[0].src}" alt="Poster for ${movies[0].name}" class="img" /></a></div>
            <div><a href="/films/movie.html?movie=${movies[3].id}"><img src="${movies[3].images[0].src}" alt="Poster for ${movies[3].name}" class="img" /></a></div>`;

    
        //filltering movies with specific genre
        const categories = movies[i].categories;

        for (let j = 0; j < categories.length; j++) {
            const genre = categories[j].name;
            console.log(genre);

            const filteredGenre = filterGenre(genre, movies[i]);

            
            function filterGenre(genre, movie) {
                // making a reusable function to html content
                function moviesContainer(movie, container) {
                    return container.innerHTML += `<div>
                    <a href="/films/movie.html?movie=${movie.id}"><img src="${movie.images[0].src}" alt="Poster for ${movie.name}" class="img" /></a></div>`;
                }

                 // adding horror section
                if(genre.toLowerCase().includes("horror") && horrorContainer !== null) {
                    return moviesContainer(movie, horrorContainer);
                }
                // adding comedy section
                if(genre.toLowerCase().includes("comedy") && comedyContainer !== null) {
                    return moviesContainer(movie, comedyContainer);
                }
                // adding drama section
                if(genre.toLowerCase().includes("drama") && dramaContainer !== null) {
                    return moviesContainer(movie, dramaContainer);
                }

                if(genre.toLowerCase().includes("action") && actionContainer !== null) {
                    return moviesContainer(movie, actionContainer);
                }
            }  
        }
    }
   } catch(error) {
    console.log(error);
    }
}

getMovies();



  

