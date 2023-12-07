import { fastify } from "fastify"
import { DatabaseMemory } from "./database.memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'olá mundo'
})

server.post('/livro', (request, reply) => {
const body = request.body
console.log(body)
const {titulo, autor, npaginas} = request.body
    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
    })
    console.log(database.list())
// retornando o status da rota
return reply.status(201).send()
})

server.get('/livro', (request) => {
    //return "Ler!"
    const search = request.query.search

    console.log(search)

    const livros = database.list(search)
    console.log(livros)
    return livros
})

server.put('/livro/:id', (request, reply) => {

    const livroId = request.params.id
    const {titulo, autor, npaginas} = request.body
    const livro = database.update(livroId, {
        titulo,
        autor,
        npaginas,
    })
    return reply.status(204).send()
})

server.delete('/livro/:id', (request, reply) => {

    const livroId = request.params.id

    database.delete(livroId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})

