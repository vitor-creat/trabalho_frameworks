import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Anime extends RowDataPacket{
    id_anime: number
    titulo?: string
    sinopse?: string
    ano_lancamento?: number
    status?: string
    capa?: string
}

interface AnimeDetalhes extends RowDataPacket{
    id_anime: number
    titulo: string
    sinopse: string
    ano_lancamento: number
    status: string
    capa: string
    media_nota: number
}

export class AnimeModel{
    async create(titulo:string, sinopse:string, ano_lancamento:number, status:string, capa:string, id_categorias:number[]) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_anime (titulo, sinopse, ano_lancamento, status, capa) VALUES (?,?,?,?,?)`, 
                [titulo, sinopse, ano_lancamento, status, capa])

            const id_anime = results.insertId

            for (const id_categoria of id_categorias) {
                await connection
                    .execute(
`INSERT INTO tb_anime_categoria (tb_categoria_id_categoria, tb_anime_id_anime) VALUES (?,?)`,
                    [id_categoria, id_anime]
                )
            }

            return id_anime
        } catch (error) {
            throw error
        }
    }

    async getAnimeByName(titulo:string){
        try {
            const [results] = await connection.execute<Anime[]>(
`SELECT * FROM tb_anime WHERE titulo LIKE ?`,
                [`%${titulo}%`]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async getAnimeByCategoria(id_categoria:number){
        try {
            const [results] = await connection.execute<Anime[]>(
`SELECT A.*
FROM tb_anime A
INNER JOIN tb_anime_categoria AC ON AC.tb_anime_id_anime = A.id_anime
WHERE AC.tb_categoria_id_categoria = ?`,
                [id_categoria]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async detalhes(id_anime:number){
        try {
            const [results] = await connection.execute<AnimeDetalhes[]>(
`SELECT A.*, AVG(V.nota) AS media_nota
FROM tb_anime A
LEFT JOIN tb_avaliacao V ON V.tb_anime_id_anime = A.id_anime
WHERE A.id_anime = ?
GROUP BY A.id_anime`,
                [id_anime]
            )
            return results[0]
        } catch (error) {
            throw error
        }
    }

    async melhoresQueAMedia(){
        try {
            const [results] = await connection.execute<AnimeDetalhes[]>(
`SELECT A.*, AVG(V.nota) AS media_nota
FROM tb_anime A
INNER JOIN tb_avaliacao V ON V.tb_anime_id_anime = A.id_anime
GROUP BY A.id_anime
HAVING AVG(V.nota) > (SELECT AVG(nota) FROM tb_avaliacao)`
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async semAvaliacoes(){
        try {
            const [results] = await connection.execute<Anime[]>(
`SELECT * FROM tb_anime
WHERE id_anime NOT IN (SELECT tb_anime_id_anime FROM tb_avaliacao)`
            )
            return results
        } catch (error) {
            throw error
        }
    }
}