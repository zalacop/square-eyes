// accessing html content
const continueContainer = document.querySelector(".continue");
const myListContainer = document.querySelector(".my-list");
const horrorContainer = document.querySelector(".horror");
const comedyContainer = document.querySelector(".comedy");
const dramaContainer = document.querySelector(".drama");
const actionContainer = document.querySelector(".action");
const promotionsContainer = document.querySelector(".images");
const promotionsNavContainer = document.querySelector(".navigation-manual");

// accessing html content on movie page 
const nextContainer = document.querySelector(".what_next");

//creating the API url (http://localhost:10004/wp-json/wc/store/products)
// https://www.square-eyes-z91.no/

const localHost = "https://www.square-eyes-z91.no/";
const woocommerce = "/wp-json/wc/store";
const products = "/products"; 
const consumerKey = "ck_68bcdb5809a7ef0e264c3fb000e5a203fa28f662";
const consumerSecret = "cs_57a55410e81b8cb6da07582ba6a508627ebbc75e";
const featured = "?featured=true";

const url = localHost + woocommerce + products + "?" + consumerKey+ "&" + consumerSecret;
const featuredURL = localHost + woocommerce + products + featured + "&" + consumerKey + "&" + consumerSecret; 

async function getMovies() {

   // fetching the JSON and catching error message
   
   try {

    // adding featured section
    const featuredResonse = await fetch(featuredURL);
    const featuredMovies = await featuredResonse.json();
    console.log(featuredMovies);

    if(featuredMovies.length > 0 && promotionsContainer !== null) {
        for (let f = 0; f < featuredMovies.length; f++) {
            console.log(featuredMovies[f].name);
    
            // adding featured/promotions html
            promotionsContainer.innerHTML = `<input type="radio" name="slide" id="image1" checked>
            <input type="radio" name="slide" id="image2">
            <input type="radio" name="slide" id="image3">
            
            <img src="${featuredMovies[0].images[0].src}" alt="Poster for ${featuredMovies[0].name}" class="img1" />
            <img src="${featuredMovies[1].images[0].src}" alt="Poster for ${featuredMovies[1].name}" class="img2" />
            <img src="${featuredMovies[2].images[0].src}" alt="Poster for ${featuredMovies[2].name}" class="img3" />`
            
            promotionsNavContainer.innerHTML = `<label for="image1"></label>
            <label for="image2"></label>
            <label for="image3"></label>`;
        }
    }

    // adding content to home page
    const response = await fetch(url);
    const movies = await response.json();

    console.log(movies);



    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i].name);

        // adding continue watching section
            continueContainer.innerHTML = `
            <div><img src="${movies[2].images[0].src}" alt="Poster for ${movies[2].name}" class="continue__img" /></div>
            <div><img src="${movies[5].images[0].src}" alt="Poster for ${movies[5].name}" class="continue__img" /></div>
            <div><img src="${movies[7].images[0].src}" alt="Poster for ${movies[7].name}" class="continue__img" /></div>`;

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
   } catch(error) { // catching if an error occours
    console.log(error);
    continueContainer.innerHTML = errorMessage();// displaying error message
    }
}

getMovies();



  

