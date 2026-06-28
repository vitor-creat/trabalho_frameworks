import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Episodio extends RowDataPacket{
    id_episodio: number
    titulo?: string
    numero?: number
    duracao?: number
    url_video?: string
    id_anime?: number
}

export class EpisodioModel{
    async create(id_episodio:number, titulo:string, numero:number, duracao:number, url_video:string, id_anime:number) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_episodio (id_episodio, titulo, numero, duracao, url_video, id_anime) VALUES (?,?,?,?,?,?)`, 
                [id_episodio, titulo, numero, duracao, url_video, id_anime])
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async readByAnime(id_anime:number){
        try {
            const [results] = await connection.execute<Episodio[]>(
`SELECT * FROM tb_episodio WHERE id_anime = ? ORDER BY numero`,
                [id_anime]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async update(id_episodio:number, titulo:string, numero:number, duracao:number, url_video:string, id_anime:number) {
        try {
            const [results] = await connection
                .execute<Episodio[]>(
`SELECT * FROM tb_episodio WHERE id_episodio = ?`,
                [id_episodio]
            )
            const dados = results[0]
            titulo = titulo ?? dados!.titulo
            numero = numero ?? dados!.numero
            duracao = duracao ?? dados!.duracao
            url_video = url_video ?? dados!.url_video
            id_anime = id_anime ?? dados!.id_anime

            await connection
                .execute(
`UPDATE tb_episodio SET titulo = ?, 
                numero = ?, 
                duracao = ?,
                url_video = ?,
                id_anime = ?
                WHERE id_episodio = ?`,
                [titulo, numero, duracao, url_video, id_anime, id_episodio]
            )
        } catch (error) {
            throw error
        }
    }

    async delete(id_episodio:number){
        try {
            await connection
                .execute(
`DELETE FROM tb_episodio WHERE id_episodio = ?`,
                [id_episodio]
            )
        } catch (error) {
            throw error
        }
    }
}