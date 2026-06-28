import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Avaliacao extends RowDataPacket{
    tb_usuario_id_usuario: number
    tb_anime_id_anime: number
    nota?: number
    comentario?: string
    data_comentario?: Date
}

interface AvaliacaoPorUsuario extends RowDataPacket{
    titulo: string
    nota: number
    comentario: string
    data_comentario: Date
}

interface AvaliacaoPorAnime extends RowDataPacket{
    nome_usuario: string
    nota: number
    comentario: string
}

export class AvaliacaoModel{
    async avaliar(tb_usuario_id_usuario:number, tb_anime_id_anime:number, nota:number, comentario:string) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_avaliacao (tb_usuario_id_usuario, tb_anime_id_anime, nota, comentario, data_comentario) VALUES (?,?,?,?,?)`, 
                [tb_usuario_id_usuario, tb_anime_id_anime, nota, comentario, new Date()])
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async readByUser(tb_usuario_id_usuario:number){
        try {
            const [results] = await connection.execute<AvaliacaoPorUsuario[]>(
`SELECT A.titulo, V.nota, V.comentario, V.data_comentario
FROM tb_avaliacao V
INNER JOIN tb_anime A ON A.id_anime = V.tb_anime_id_anime
WHERE V.tb_usuario_id_usuario = ?`,
                [tb_usuario_id_usuario]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async readByAnime(tb_anime_id_anime:number){
        try {
            const [results] = await connection.execute<AvaliacaoPorAnime[]>(
`SELECT U.nome_usuario, V.nota, V.comentario
FROM tb_avaliacao V
INNER JOIN tb_usuario U ON U.id_usuario = V.tb_usuario_id_usuario
WHERE V.tb_anime_id_anime = ?`,
                [tb_anime_id_anime]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async editarAvaliacao(tb_usuario_id_usuario:number, tb_anime_id_anime:number, nota:number, comentario:string) {
        try {
            const [results] = await connection
                .execute<Avaliacao[]>(
`SELECT * FROM tb_avaliacao WHERE tb_usuario_id_usuario = ? AND tb_anime_id_anime = ?`,
                [tb_usuario_id_usuario, tb_anime_id_anime]
            )
            const dados = results[0]
            nota = nota ?? dados!.nota
            comentario = comentario ?? dados!.comentario

            await connection
                .execute(
`UPDATE tb_avaliacao SET nota = ?, 
                comentario = ?
                WHERE tb_usuario_id_usuario = ? AND tb_anime_id_anime = ?`,
                [nota, comentario, tb_usuario_id_usuario, tb_anime_id_anime]
            )
        } catch (error) {
            throw error
        }
    }

    async apagarAvaliacao(tb_usuario_id_usuario:number, tb_anime_id_anime:number){
        try {
            await connection
                .execute(
`DELETE FROM tb_avaliacao WHERE tb_usuario_id_usuario = ? AND tb_anime_id_anime = ?`,
                [tb_usuario_id_usuario, tb_anime_id_anime]
            )
        } catch (error) {
            throw error
        }
    }
}