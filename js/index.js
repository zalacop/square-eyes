// accessing html content
const continueContainer = document.querySelector(".continue");
const myListContainer = document.querySelector(".my-list");
const horrorContainer = document.querySelector(".horror");
const comedyContainer = document.querySelector(".comedy");
const dramaContainer = document.querySelector(".drama");
const actionContainer = document.querySelector(".action");

// async function getMovies() {

//     // fetching the JSON and catching error message    
//     try {
//         const response = await fetch("/json/movies.json");
//         const movies =  await response.json("/json/movies.json");

//         console.log(movies);

//      //looping list of movies and creating html
//     for (let i = 0; i < movies.length; i++) {
//         console.log(movies[i].name)

//         // adding continue watching section
//         if (movies[i].watching === true) {
//             continueContainer.innerHTML += `
//             <div><a href="/films/watch.html"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="continue__img" /></a></div>`;
//         }

//         // adding my list section 
//         if (movies[i].myList === true) {
//             myListContainer.innerHTML += `
//             <div><a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
//         }
    
//         //filltering movies with specific genre
//         const genre = movies[i].genre;
//         const filteredGenre = genre.filter(filterGenre);

//         function filterGenre(movie) {
//             // adding horror section 
//             if(movie.toLowerCase().includes("horror")) {
//                 return horrorContainer.innerHTML += `<div>
//                     <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
//             }

//             // adding comedy section
//             if(movie.toLowerCase().includes("comedy")) {
//                 return comedyContainer.innerHTML += `<div>
//                 <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
//             }

//             // adding drama section
//             if(movie.toLowerCase().includes("drama") && dramaContainer !== null) {
//                 return dramaContainer.innerHTML += `<div>
//                 <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
//             }

//             // saw that there are not all movies displayed, so i added action section
//             if(movie.toLowerCase().includes("action") && actionContainer !== null) {
//                 return actionContainer.innerHTML += `<div>
//                 <a href="/films/movie.html?movie=${movies[i].id}"><img src="${movies[i].image}" alt="Poster for ${movies[i].name}" class="img" /></a></div>`;
//             }
//         }  
//     } 
//     } catch (error) {
//         console.log(error);
//     }
// }
// getMovies();



//creating the API url (http://localhost:10004/wp-json/wc/store/products)

const api = "http://localhost:10004";
const woocommerce = "/wp-json/wc/store";
const products ="/products"; 

const url = api + woocommerce + products;


async function getMovies() {

   // fetching the JSON and catching error message
   
   try {
    const response = await fetch(url);
    const movies = await response.json();

    console.log(movies);

    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i].name);
        // // adding continue watching section
            continueContainer.innerHTML = `
            <div><a href="/films/watch.html"><img src="${movies[2].images[0].src}" alt="Poster for ${movies[2].name}" class="continue__img" /></a></div>
            <div><a href="/films/watch.html"><img src="${movies[5].images[0].src}" alt="Poster for ${movies[5].name}" class="continue__img" /></a></div>
            <div><a href="/films/watch.html"><img src="${movies[7].images[0].src}" alt="Poster for ${movies[7].name}" class="continue__img" /></a></div>`;

        // // adding my list section 
            myListContainer.innerHTML = `
            <div><a href="/films/movie.html?movie=${movies[6].id}"><img src="${movies[6].images[0].src}" alt="Poster for ${movies[6].name}" class="img" /></a></div>
        <div><a href="/films/movie.html?movie=${movies[3].id}"><img src="${movies[3].images[0].src}" alt="Poster for ${movies[3].name}" class="img" /></a></div>`;

    
        //filltering movies with specific genre
        const categories = movies[i].categories;

        for (let j = 0; j < categories.length; j++) {
            const genre = categories[j].name;
            console.log(genre);

            const filteredGenre = filterGenre(genre, movies[i]);

            function filterGenre(genre, movie) {
                function moviesContainer(genre, movie, container) {
                    return container.innerHTML += `<div>
                    <a href="/films/movie.html?movie=${movie.id}"><img src="${movie.images[0].src}" alt="Poster for ${movie.name}" class="img" /></a></div>`;
                }

                 // adding horror section
                if(genre.toLowerCase().includes("horror") && horrorContainer !== null) {
                    return moviesContainer(genre, movie, horrorContainer);
                }
                // adding comedy section
                if(genre.toLowerCase().includes("comedy") && comedyContainer !== null) {
                    return moviesContainer(genre, movie, comedyContainer);
                }
                // adding drama section
                if(genre.toLowerCase().includes("drama") && dramaContainer !== null) {
                    return moviesContainer(genre, movie, dramaContainer);
                }

                if(genre.toLowerCase().includes("action") && actionContainer !== null) {
                    return moviesContainer(genre, movie, actionContainer);
                }
            }  
        }
    }
   } catch(error) {
    console.log(error);
    }
}

getMovies();



  

