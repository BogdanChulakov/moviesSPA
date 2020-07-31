import { login as apiLogin } from '../js/data.js';
import { logOut } from '../js/data.js';
import { showInfo, showError } from './notification.js';

export default async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/users/loginForm.hbs')
}
export async function loginPost() {
    try {
        const result = await apiLogin(this.params.username, this.params.password)
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error;
        }
        
        this.app.userData.username = result.username;
        this.app.userData.userId = result.userId;
        showInfo(`Logged in as ${result.username}`)
        this.redirect("#/home", this.app.userData)
        
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}
export async function logout() {
    try {
        const result = await logOut();
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error;
        }

        this.app.userData.username = '';
        this.app.userData.userId = '';

        showInfo('Successfully logged out!');

        this.redirect("#/home")

    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}