import { type ResultSetHeader } from "mysql2"
import {connection} from "../database/connection.js"

export class AvaliacaoModel{

    async avaliar(
        userId:number,
        animeId:number,
        nota: number,
        comentario:string
    ){
        try {
        const [results] = await connection.
        execute<ResultSetHeader>(
            `INSERT INTO tb_avaliacao (tb_usuario_id_usuario, tb_anime_id_anime, nota, comentario, data_comentario) VALUES (?,?,?,?,?)`,
            [userId, animeId, nota, comentario, new Date()]
        )
        return results
        } catch (error) {
            
        }
    
    }

    // async editarAvaliacao(
    //     userId:number,
    //     animeId:number,
        
    // )


}