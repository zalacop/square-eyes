// adding a variable to href value, retrieving it from the query string and call it
const queryString = document.location.search;
const params = new Proxy(new URLSearchParams(queryString), {
    get: function(searchParams, id) {
        return searchParams.get(id);
    }
});
const movieName = params.movie;

console.log(movieName);


// finding the chosen movie 
async function findMovie(movieId) {
    try {
        const response = await fetch("/json/movies.json");
        const movies =  await response.json("/json/movies.json");
        for(let i = 0; i < movies.length; i++) {
            if(movies[i].id === movieId) {
                return movies[i];
            }
        }
    } catch(error) {
        console.log(error);
    }
}

// accessing html content
const movie = document.querySelector(".movie");
const movieDescription = document.querySelector(".description");


// getting the chosen movie
async function getMovie() {
    const movie2 = await findMovie(movieName);
    console.log(movie2);

    // adding name property to the title
    const newTitle = movie2.name; 
    document.title = newTitle;

    // adding space in properties in an array
    const genre = movie2.genre.join(", ");
    const cast = movie2.cast.join(", ");

    // creating html for the chosen movie
    movie.innerHTML = `<div class="text">
                        <h1>${movie2.name}</h1>
                        <div class="details">
                            <p>${genre}</p>
                            <p>${movie2.year}</p>
                            <p>${movie2.time}</p>
                        </div>
                        <a href="/user/payment.html"><button class="cta log">Buy Now 169 NOK</button></a>
                        <div class="movie-icons">
                            <div class="my-list"><i class="fa-regular fa-plus"></i></div>
                            <div class="star"><i class="fa-regular fa-star"></i></div>
                        </div>
                      </div>
    <div class="poster">
        <img src="${movie2.image}" alt="Poster for ${movie2.name}" class="poster-img"/>
        <div class="close-icon">
        <a href="/index.html"><i class="fa-regular fa-circle-xmark"></i></a>
        </div>
    </div>`;

    movieDescription.innerHTML = `<p>${movie2.description}</p>
    <p>Cast: ${cast}</p>`;
}
getMovie();
