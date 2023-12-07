import { randomUUID } from "crypto"
import { create } from "domain"

export class DatabaseMemory{

#livros = new Map()
list(search){
    return Array.from(this.#livros.entries()).map((livroArry) => {
        const id = livroArry [0]

        const data = livroArry[1]

        return{
            id,
            ...data,
        }
    })
    .filter(livro => {
        if (search) {
            return livro.titulo.includes(search)
        }
        return true
    })
}


create(livro){
    const livroId = randomUUID()
    this.#livros.set(livroId, livro)
}
// atualizar livro
update(id, livro){
    this.#livros.set(id, livro)
}

delete(id, livro){
    this.#livros.delete(id, livro)
}
}