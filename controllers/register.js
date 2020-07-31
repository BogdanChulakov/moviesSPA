import { register as apiRegister } from '../js/data.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/users/registerForm.hbs',this.app.userData)
}

export async function registerPost() {
    if (this.params.password !== this.params.repeatPassword) {
        alert('Pasword must match!');
        return;
    }
    if (this.params.username.length < 3) {
        alert('Name must be at least 3 characters!');
        return;
    }
    if (this.params.password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
    }

    try {
        const result = await apiRegister(this.params.username, this.params.password)
        if (result.hasOwnProperty("errorData")) {
            const error = new Error()
            Object.assign(error, result)
            throw error
        }
        this.redirect("#/login")

    } catch (err) {
        console.log(err)
        alert(err.message)
    }
}