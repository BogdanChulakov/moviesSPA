import home from '../controllers/home.js';
import register, { registerPost } from '../controllers/register.js';
import login, { loginPost, logout } from '../controllers/login.js';
import catalog, { create, edit, details, createPost,buyTicket,getMyMovies , editPost } from '../controllers/movies.js';



window.addEventListener("load", () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            movies:[]
        }

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);

        this.get('#/catalog', catalog);
        this.get('#/my_movies', getMyMovies);

        this.get('#/create', create);
        this.get('#/edit/:id', edit);
        this.get('#/details/:id', details);

        this.post('#/register', c => { registerPost.call(c); });
        this.post('#/login', c => { loginPost.call(c); });
        this.post('#/create', c => { createPost.call(c); });
        this.post('#/edit/:id', c => { editPost.call(c); });

        this.get('#/buy/:id', buyTicket);


    });

    app.run();
})