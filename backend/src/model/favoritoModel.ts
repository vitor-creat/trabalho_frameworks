import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Favorito extends RowDataPacket{
    tb_usuario_id_usuario: number
    tb_anime_id_anime: number
    data_favoritado?: Date
}

export class FavoritoModel{
    async favoritar(tb_usuario_id_usuario:number, tb_anime_id_anime:number) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_favorito (tb_usuario_id_usuario, tb_anime_id_anime, data_favoritado) VALUES (?,?,?)`, 
                [tb_usuario_id_usuario, tb_anime_id_anime, new Date()])
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async readByUser(tb_usuario_id_usuario:number){
        try {
            const [results] = await connection.execute<Favorito[]>(
`SELECT A.*, F.data_favoritado
FROM tb_favorito F
INNER JOIN tb_anime A ON A.id_anime = F.tb_anime_id_anime
WHERE F.tb_usuario_id_usuario = ?`,
                [tb_usuario_id_usuario]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async delete(tb_usuario_id_usuario:number, tb_anime_id_anime:number){
        try {
            await connection
                .execute(
`DELETE FROM tb_favorito WHERE tb_usuario_id_usuario = ? AND tb_anime_id_anime = ?`,
                [tb_usuario_id_usuario, tb_anime_id_anime]
            )
        } catch (error) {
            throw error
        }
    }
}