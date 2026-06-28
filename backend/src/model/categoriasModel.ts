import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Categoria extends RowDataPacket{
    id_categoria: number
    nome?: string
}

interface CategoriaQuantidade extends RowDataPacket{
    id_categoria: number
    nome: string
    quantidade: number
}

export class CategoriaModel{
    async create(id_categoria:number, nome:string) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_categoria (id_categoria, nome) VALUES (?,?)`, 
                [id_categoria, nome])
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async read(){
        try {
            const [results] = await connection.execute<Categoria[]>(
`SELECT * FROM tb_categoria`
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async update(id_categoria:number, nome:string) {
        try {
            const [results] = await connection
                .execute<Categoria[]>(
`SELECT * FROM tb_categoria WHERE id_categoria = ?`,
                [id_categoria]
            )
            const dados = results[0]
            nome = nome ?? dados!.nome

            await connection
                .execute(
`UPDATE tb_categoria SET nome = ? WHERE id_categoria = ?`,
                [nome, id_categoria]
            )
        } catch (error) {
            throw error
        }
    }

    async delete(id_categoria:number){
        try {
            await connection
                .execute(
`DELETE FROM tb_categoria WHERE id_categoria = ?`,
                [id_categoria]
            )
        } catch (error) {
            throw error
        }
    }

    async quantidadeAnimes(){
        try {
            const [results] = await connection.execute<CategoriaQuantidade[]>(
`SELECT C.id_categoria, C.nome, COUNT(A.id_anime) AS quantidade
FROM tb_categoria C
LEFT JOIN tb_anime A ON A.id_categoria = C.id_categoria
GROUP BY C.id_categoria, C.nome`
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async categoriasPopulares(){
        try {
            const [results] = await connection.execute<CategoriaQuantidade[]>(
`SELECT C.id_categoria, C.nome, COUNT(A.id_anime) AS quantidade
FROM tb_categoria C
JOIN tb_anime A ON A.id_categoria = C.id_categoria
GROUP BY C.id_categoria, C.nome
HAVING COUNT(A.id_anime) >= 2`
            )
            return results
        } catch (error) {
            throw error
        }
    }
}