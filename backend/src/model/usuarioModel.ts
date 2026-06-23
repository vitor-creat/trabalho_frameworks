import type { RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface usuario{
    id: number
    nome:string
    email: string
    data_cadastro: string
    foto_perfil: string
}

export class Usuario{

    async create(nome:string, email:string, data_cadastro:string, foto_perfil:string) {
        try {
        await connection
        .execute(
            `INSERT INTO usuarios (nome, email, data_cadastro, foto_perfil) VALUES (?,?,?,?)`, 
            [nome, email, data_cadastro, foto_perfil])
        } catch (error) {
            
        }

    }

    async update(id:number, nome:string, email:string, data_cadastro:string, foto_perfil:string) {
        try {
            
            const [results] = await connection
            .execute<RowDataPacket[]>(
                `SELECT * FROM usuarios WHERE id_usuario = ?`,
                [id]
            )
            const dados = results[0]
            
            nome = nome ?? dados!.nome
            email = email ?? dados!.email
            data_cadastro = data_cadastro ?? dados!.data_cadastro
            foto_perfil = foto_perfil ?? dados!.foto_perfil
            
            await connection
            .execute(
                `UPDATE SET nome = ?, 
                email = ?, 
                data_cadastro = ?,
                foto_perfil = ?
                `,
                [nome, email, data_cadastro, foto_perfil]
            )
        } catch (error) {
            
        }
    }
    
    
    async delete(id:number){
        try {
        await connection
        .execute(
            `DELETE FROM usuarios WHERE id_usuario = ?`,
            [id]
        )
        } catch (error) {
            
        }
        
    }



}