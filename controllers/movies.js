import { showInfo, showError } from './notification.js';
import { createMovie, getAllMovies, buyTicket as apiBuyTicket, getMoviesByUserId, editMovie, getMovieById, deleteMovie as apiDelete } from '../js/data.js';

export default async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')
    }
    const search = this.params.search || '';
    const movies = await getAllMovies(search);
    this.app.userData.movies = movies;
    const context = Object.assign({ origin: encodeURIComponent('#/catalog'), search }, this.app.userData);

    this.partial('./templates/movies/catalog.hbs', context)
}

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/addForm.hbs', this.app.userData)
}
export async function createPost() {
    try {
        if (this.params.title.length === 0) {
            throw new Error('Title cannot be empty!');
        }
        let movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        }
        const result = await createMovie(movie)
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error
        }
        showInfo('Successfully created movie!')
        this.redirect("#/details/" + result.objectId)

    } catch (err) {
        console.log(err)
        showError(err.message)
    }
}
export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const movie = this.app.userData.movies.find(x => x.objectId === this.params.id);
    const context = Object.assign({ movie }, this.app.userData)
    this.partial('./templates/movies/editForm.hbs', context)
}
export async function editPost() {
    try {
        const movieId = this.params.id
        if (this.params.title.length === 0) {
            throw new Error('Title cannot be empty!');
        }
        let movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        }
        const result = await editMovie(movieId, movie)
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error;

        }
        for (let i = 0; i < this.app.userData.movies.length; i++) {
            if (this.app.userData.movies[i].objectId === movieId) {
                this.app.userData.movies.splice(i, 1, result);
            }
        }
        showInfo('Successfully edited movie!')
        this.redirect("#/details/" + result.objectId)

    } catch (err) {
        console.log(err)
        showError(err.message)
    }
}
export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    let movie = this.app.userData.movies.find(x => x.objectId === this.params.id);
    if (movie === undefined) {
        movie = await getMovieById(this.params.id);
    }
    this.app.userData.movie = movie;
    const context = Object.assign({ origin: encodeURIComponent('#/details/' + this.params.id) }, this.app.userData);

    this.partial('./templates/movies/details.hbs', context)
}
export async function buyTicket() {
    const movieId = this.params.id;
    let movie = this.app.userData.movies.find(x => x.objectId === movieId)
    if (movie === undefined) {
        movie = await getMovieById(this.params.id);
    }
    try {
        const result = await apiBuyTicket(movie);
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error
        }
        showInfo(`Bought ticket for ${movie.title}`)
        this.redirect(this.params.origin);

    } catch (err) {
        console.log(err)
        showError(err.message)
    }
}
export async function getMyMovies() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        myMovie: await this.load('./templates/movies/myMovie.hbs')
    }
    const movies = await getMoviesByUserId();
    this.app.userData.movies = movies;

    const context = Object.assign({ myMovies: true, origin: encodeURIComponent('#/my_movies') }, this.app.userData)
    this.partial('./templates/movies/catalog.hbs', context)
}
export async function deleteMovie() {
    const movieId = this.params.id;

    try {
        const result = await apiDelete(movieId);
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error
        }
        showInfo(`Movie deleted!`)
        this.redirect('#/my_movies');

    } catch (err) {
        console.log(err)
        showError(err.message)
    }
}