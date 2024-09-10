// API key from TMDB
const api = "api_key=d486579d8830e403887903184563bfb7";
// Base URL of the site
const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300"; // You can change "w300" to your preference

// Requests for movies data
const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`, 
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

// Used to truncate the string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];

        const banner = document.getElementById("banner");
        const banner_title = document.getElementById("banner__title");
        const banner_desc = document.getElementById("banner__description");

        banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
        banner_desc.innerText = truncate(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
    })
    .catch(error => console.error('Error fetching banner data:', error));

// Movie Rows Function
function createMovieRow(titleText, fetchUrl, posterClassName) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");

            row.className = "row";

            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row__title";
            title.innerText = titleText;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = posterClassName;
                poster.src = `${img_url}${movie.poster_path}`;
                row_posters.appendChild(poster);
            });
        })
        .catch(error => console.error(`Error fetching ${titleText} data:`, error));
}

// Create rows for different categories
createMovieRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals, "row__posterLarge");
createMovieRow("Top Rated", requests.fetchTrending, "row__posterLarge");
createMovieRow("Action Movies", requests.fetchActionMovies, "row__poster");
createMovieRow("Comedy Movies", requests.fetchComedyMovies, "row__poster");
createMovieRow("Romance Movies", requests.fetchRomanceMovies, "row__poster");
createMovieRow("Documentaries", requests.fetchDocumentaries, "row__poster");

// Add scroll event listener for navbar
window.addEventListener("scroll", function() {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("active", window.scrollY > 0);
});


