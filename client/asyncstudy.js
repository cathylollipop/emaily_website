// write a function to retrieve a blob of json
// make an ajax request. use the 'fetch' function.
// https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//     fetch('https://rallycoding.herokuapp.com/api/music_albums') // fetch returns a promise
//         .then(res => res.json()) // .json() - get real json and returns another promise
//         .then(json => console.log(json));
// }
//
// fetchAlbums();

const fetchAlbums = async () => { // = async function fetchAlbums() {
    // put await before any statement that produces a promise
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
};

fetchAlbums();