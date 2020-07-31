export default async function catalog(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/catalog.hbs',this.app.userData)
}

export async function create(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/addForm.hbs',this.app.userData)
}

export async function edit(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/editForm.hbs',this.app.userData)
}

export async function details(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/details.hbs',this.app.userData)
}