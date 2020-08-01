import { register as apiRegister } from '../js/data.js';
import{showInfo,showError} from './notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/users/registerForm.hbs',this.app.userData)
}

export async function registerPost() {

    try {
        if (this.params.title !== this.params.repeatPassword) {
            throw new Error('Pasword must match!');
        }
        if (this.params.username.length < 3) {
            throw new Error('Name must be at least 3 characters!');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters!');
        }
        const result = await apiRegister(this.params.username, this.params.password)
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error
        }
        showInfo('Successfully register!')
        this.redirect("#/login")

    } catch (err) {
        console.log(err)
        showError(err.message)
    }
}