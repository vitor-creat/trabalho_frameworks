import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Usuario extends RowDataPacket{
    id: number
    nome?:string
    email?: string
    foto_perfil?: string
}

export class UsuarioModel{

    async create(nome:string, email:string, foto_perfil:string) {
        try {
        const [results] = await connection
        .execute<ResultSetHeader>(
            `INSERT INTO tb_usuario (nome, email, data_cadastro, foto_perfil) VALUES (?,?,?,?)`, 
            [nome, email, new Date(), foto_perfil])
            results.insertId
        } catch (error) {
            
        }

    }

    async read(id:number){
        try {
            const [results] = await connection.execute<Usuario[]>(
                `SELECT U.nome, U.foto_perfil FROM tb_usuario U WHERE id_usuario = ?`,
                [id]
            )
            
        } catch (error) {
            
        }
    }

    async update(id:number, nome:string, email:string, foto_perfil:string) {
        try {
            
            const [results] = await connection
            .execute<Usuario[]>(
                `SELECT * FROM tb_usuario WHERE id_usuario = ?`,
                [id]
            )
            const dados = results[0]
            
            nome = nome ?? dados!.nome
            email = email ?? dados!.email
            foto_perfil = foto_perfil ?? dados!.foto_perfil
            
            await connection
            .execute(
                `UPDATE tb_usuario SET nome = ?, 
                email = ?, 
                data_cadastro = ?,
                foto_perfil = ?
                `,
                [nome, email, foto_perfil]
            )
        } catch (error) {
            
        }
    }
    
    
    async delete(id:number){
        try {
        await connection
        .execute(
            `DELETE FROM tb_usuario WHERE id_usuario = ?`,
            [id]
        )
        } catch (error) {
            
        }
        
    }



}