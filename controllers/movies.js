export default async function catalog(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/catalog.hbs')
}

export async function create(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/addForm.hbs')
}

export async function edit(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/editForm.hbs')
}

export async function details(){
    this.partials={
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/movies/details.hbs')
}