// // adding a variable to href value, retrieving it from the query string and call it
// const queryString = document.location.search;
// const params = new Proxy(new URLSearchParams(queryString), {
//     get: function(searchParams, id) {
//         return searchParams.get(id);
//     }
// });
// const movieName = params.movie;

// console.log(movieName);


// // finding the chosen movie 
// async function findMovie(movieId) {
//     try {
//         const response = await fetch("/json/movies.json");
//         const movies =  await response.json("/json/movies.json");
//         for(let i = 0; i < movies.length; i++) {
//             if(movies[i].id === movieId) {
//                 return movies[i];
//             }
//         }
//     } catch(error) {
//         console.log(error);
//     }
// }

// accessing html content
const movieContainer = document.querySelector(".movie");
const movieDescriptionContainer = document.querySelector(".description");


// // getting the chosen movie
// async function getMovie() {
//     const movie2 = await findMovie(movieName);
//     console.log(movie2);

//     // adding name property to the title
//     const newTitle = movie2.name; 
//     document.title = newTitle;

//     // adding space in properties in an array
//     const genre = movie2.genre.join(", ");
//     const cast = movie2.cast.join(", ");

//     // creating html for the chosen movie
//     movie.innerHTML = `<div class="text">
//                         <h1>${movie2.name}</h1>
//                         <div class="details">
//                             <p>${genre}</p>
//                             <p>${movie2.year}</p>
//                             <p>${movie2.time}</p>
//                         </div>
//                         <a href="/user/payment.html"><button class="cta log">Buy Now 169 NOK</button></a>
//                         <div class="movie-icons">
//                             <div class="my-list"><i class="fa-regular fa-plus"></i></div>
//                             <div class="star"><i class="fa-regular fa-star"></i></div>
//                         </div>
//                       </div>
//     <div class="poster">
//         <img src="${movie2.image}" alt="Poster for ${movie2.name}" class="poster-img"/>
//         <div class="close-icon">
//         <a href="/index.html"><i class="fa-regular fa-circle-xmark"></i></a>
//         </div>
//     </div>`;

//     movieDescription.innerHTML = `<p>${movie2.description}</p>
//     <p>Cast: ${cast}</p>`;
// }
// getMovie();


const localHost = "https://www.square-eyes-z91.no/";
const woocommerce = "/wp-json/wc/store";
const products = "/products"; 
const consumerKey = "ck_68bcdb5809a7ef0e264c3fb000e5a203fa28f662";
const consumerSecret = "cs_57a55410e81b8cb6da07582ba6a508627ebbc75e";

// adding a variable to href value, retrieving it from the query string and using it in an api call
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("movie");

console.log(id);

const url = localHost + woocommerce + products + "/" + id + "?" + consumerKey+ "&" + consumerSecret;

// finding the chosen movie 
async function findMovie() {
    try {
        const response = await fetch(url);
        const movies =  await response.json();
        const movieName = movies.name;
        const movieDescription = movies.description;
        console.log(movieDescription);

        // adding name property to the title and fixed encoding 
        const title = movieName;
        function removeOuterTags(inputString) {
            const parser = new DOMParser();
            const getTitle = parser.parseFromString(inputString, "text/html");
            return getTitle.body.innerText;
        }

        const inputString = `<p>${title}</p>`;
        const newTitle = removeOuterTags(inputString);
        console.log(newTitle);

        document.title = newTitle;

        // creating the genre array and joining it
        const genres = [movies.categories[0].name, movies.categories[1].name];
        const genre = genres.join(", ");
        console.log(genre);

        // getting the price 
        const price = movies.prices.price/100;
        console.log(price);

        const attributes = movies.attributes;

        // creating cast, year and time variables to use in making html
        const cast = findAttributeValue(attributes, "cast");
        const year = findAttributeValue(attributes, "release year");
        const time = findAttributeValue(attributes, "time");
        console.log(time);
        
        // getting an array of attributes, to access cast, release year and length of the movie
        function findAttributeValue(attributes, name) {
            for (let i = 0; i < attributes.length; i++) {
                const attribute = attributes[i];
                if(attribute.name.toLowerCase().includes(name)) {
                    return attribute.terms[0].name;
                }
            }
        }

        // creating html for the chosen movie
        movieContainer.innerHTML = `<div class="text">
                            <h1>${movieName}</h1>
                            <div class="details">
                                <p>${genre}</p>
                                <p>${year}</p>
                                <p>${time}</p>
                            </div>
                            <a href="/user/payment.html"><button class="cta log">Buy Now ${price} NOK</button></a>
                            <div class="movie-icons">
                                <div class="my-list"><i class="fa-regular fa-plus"></i></div>
                                <div class="star"><i class="fa-regular fa-star"></i></div>
                            </div>
                        </div>
        <div class="poster">
            <img src="${movies.images[0].src}" alt="Poster for ${movieName}" class="poster-img"/>
            <div class="close-icon">
            <a href="/index.html"><i class="fa-regular fa-circle-xmark"></i></a>
            </div>
        </div>`;

        movieDescriptionContainer.innerHTML = `${movieDescription}
        <p>Cast: ${cast}</p>`;


    } catch(error) { // catching if an error occours
        console.log(error);
        movieContainer.innerHTML = errorMessage(); // displaying error message
    }
}

findMovie();
