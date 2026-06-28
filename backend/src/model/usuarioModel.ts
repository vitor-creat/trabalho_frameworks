import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { connection } from "../database/connection.js"

interface Usuario extends RowDataPacket{
    id_usuario: number
    nome_usuario?: string
    email?: string
    senha?: string
    data_cadastro?: Date
    foto_perfil?: string
}

export class UsuarioModel{
    async create(nome_usuario:string, email:string, senha:string, foto_perfil:string) {
        try {
            const [results] = await connection
                .execute<ResultSetHeader>(
`INSERT INTO tb_usuario (nome_usuario, email, senha, data_cadastro, foto_perfil) VALUES (?,?,?,?,?)`, 
                [nome_usuario, email, senha, new Date(), foto_perfil])
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async read(id_usuario:number){
        try {
            const [results] = await connection.execute<Usuario[]>(
`SELECT * FROM tb_usuario WHERE id_usuario = ?`,
                [id_usuario]
            )
            return results
        } catch (error) {
            throw error
        }
    }

    async update(id_usuario:number, nome_usuario:string, email:string, senha:string, foto_perfil:string) {
        try {
            const [results] = await connection
                .execute<Usuario[]>(
`SELECT * FROM tb_usuario WHERE id_usuario = ?`,
                [id_usuario]
            )
            const dados = results[0]
            nome_usuario = nome_usuario ?? dados!.nome_usuario
            email = email ?? dados!.email
            senha = senha ?? dados!.senha
            foto_perfil = foto_perfil ?? dados!.foto_perfil

            await connection
                .execute(
`UPDATE tb_usuario SET nome_usuario = ?, 
                email = ?, 
                senha = ?,
                foto_perfil = ?
                WHERE id_usuario = ?`,
                [nome_usuario, email, senha, foto_perfil, id_usuario]
            )
        } catch (error) {
            throw error
        }
    }

    async delete(id_usuario:number){
        try {
            await connection
                .execute(
`DELETE FROM tb_usuario WHERE id_usuario = ?`,
                [id_usuario]
            )
        } catch (error) {
            throw error
        }
    }
}