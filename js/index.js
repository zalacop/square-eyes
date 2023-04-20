// accessing html content
const continueContainer = document.querySelector(".continue");
const myListContainer = document.querySelector(".my-list");
const horrorContainer = document.querySelector(".horror");
const comedyContainer = document.querySelector(".comedy");
const dramaContainer = document.querySelector(".drama");
const actionContainer = document.querySelector(".action");
const promotionsContainer = document.querySelector(".images");


//creating the API url (http://localhost:10004/wp-json/wc/store/products)

const localHost = "http://localhost:10004";
const woocommerce = "/wp-json/wc/store";
const products = "/products"; 
const featured = "?featured=true";

const url = localHost + woocommerce + products;
const featuredURL = url + featured; 



async function getMovies() {

   // fetching the JSON and catching error message
   
   try {

    // adding featured section
    const featuredResonse = await fetch(featuredURL);
    const featuredMovies = await featuredResonse.json();
    console.log(featuredMovies);
    for (let f = 0; f < featuredMovies.length; f++) {
        console.log(featuredMovies[f].name);

        // adding featured/promotions html
        promotionsContainer.innerHTML = `       <input type="radio" name="slide" id="image1" checked>
        <input type="radio" name="slide" id="image2">
        <input type="radio" name="slide" id="image3">
        
        <img src="${featuredMovies[0].images[0].src}" alt="Poster for ${featuredMovies[0].name}" class="img1" />
        <img src="${featuredMovies[1].images[0].src}" alt="Poster for ${featuredMovies[1].name}" class="img2" />
        <img src="${featuredMovies[2].images[0].src}" alt="Poster for ${featuredMovies[2].name}" class="img3" />`

    }

    // adding content to home page
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



  

