
import { connection } from "../database/connection.js";

export class FavoritoModel{

    async favoritar(
        usuario_id:number, 
        anime_id:number
    ){
        try {
            await connection
        .execute(
            `INSERT INTO tb_favoritos (tb_usuario_id_usuario, tb_anime_id_anime, data_favoritado) VALUES (?, ?, ?)`,
            [usuario_id, anime_id, new Date()]
        )
        
        } catch (error) {
            
        }
        
    }

    async readByUser(
        id_usuario:number
    ){
        try {
        const [results] = await connection
        .execute(
            `SELECT A.* FROM tb_anime A 
            INNER JOIN tb_favorito F 
            ON A.id_anime = f.tb_anime_id_anime
            WHERE f.tb_usuario_id_usuario = ?            
            `,
            [id_usuario]
        )
        return results
        } catch (error) {
            
        }
        
    }

    async delete(usuario_id:number, anime_id:number){
        try {
            await connection.execute(
                `DELETE FROM tb_favorito
                WHERE tb_usuario_id_usuario = ? AND tb_anime_id_anime`,
                [usuario_id, anime_id]
            )
        } catch (error) {
            
        }
    }



}