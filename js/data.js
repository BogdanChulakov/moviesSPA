import { showLoadind, hideLoadind } from '../controllers/notification.js'
function host(endpoint) {
    return `https://api.backendless.com/874FD7C2-3127-5829-FF87-FC2D89330F00/AB1F486E-AE4C-4E07-87E2-18A1F660CDED/${endpoint}`
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    LOGOUT: 'users/logout',
    MOVIES: "data/movies"
}
export async function register(username, password) {
    showLoadind();
    let result = await (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
    hideLoadind();
    return result;
}
export async function login(username, password) {
    showLoadind();
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);
    hideLoadind();
    return result;

}
export async function logOut() {
    const token = localStorage.getItem('userToken');

    if (!token) {
        throw new Error('User is not logged in!');
    }
    showLoadind();
    const result = fetch(host(endpoints.LOGOUT), {
        method: "GET",
        headers: {
            'user-token': token
        }
    });

    localStorage.removeItem('userToken');
    hideLoadind();
    return result;
}
export async function getAllMovies(search) {
    showLoadind();
    let result;
    if(!search){
    result= (await fetch(host(endpoints.MOVIES))).json();
    }else{
     result= (await fetch(host(endpoints.MOVIES + `?where=${escape(`genres LIKE '%${search}%'`)}`))).json();
    }
    hideLoadind();
    return result;
}
export async function getMovieById(id) {
    showLoadind();
    const result = (await fetch(host(endpoints.MOVIES + '/' + id))).json();
    hideLoadind();
    return result;
}
export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    if (!token) {
        throw new Error('User is not logged in!');
    }
    showLoadind();
    const result = (await fetch(host(endpoints.MOVIES), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "user-token": token
        },
        body: JSON.stringify(movie)
    })).json();
    if (result.hasOwnProperty("errorData")) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
    hideLoadind();
    return result;

}
export async function editMovie(id, movie) {
    const token = localStorage.getItem('userToken');

    if (!token) {
        throw new Error('User is not logged in!');
    }
    showLoadind();
    const result = (await fetch(host(endpoints.MOVIES + '/' + id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "user-token": token
        },
        body: JSON.stringify(movie)
    })).json();
    if (result.hasOwnProperty("errorData")) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
    hideLoadind();
    return result;
}
export async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');

    if (!token) {
        throw new Error('User is not logged in!');
    }
    showLoadind();
    const result = (await fetch(host(endpoints.MOVIES + '/' + id), {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "user-token": token
        }
    })).json();
    if (result.hasOwnProperty("errorData")) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
    hideLoadind();
    return result;
}
export async function getMoviesByUserId() {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');


    if (!token) {
        throw new Error('User is not logged in!');
    }
    showLoadind();
    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${userId}%27`), {
        headers: {
            "user-token": token
        }
    })).json();
    if (result.hasOwnProperty("errorData")) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
    hideLoadind();
    return result;
}
export async function buyTicket(movie) {
    let newTickets = movie.tickets - 1;
    if (newTickets < 0) {
        newTickets = 0;
    }
    const movieId = movie.objectId;

    const result = await editMovie(movieId, { tickets: newTickets });
    return result;
}

