import type { Request, Response } from "express"
import { UsuarioModel } from "../model/usuarioModel.js"

export class UsuarioController{
    async create(req: Request, res: Response) {
        try {
            const { nome_usuario, email, senha, foto_perfil } = req.body

            const usuarioModel = new UsuarioModel()
            const id_usuario = await usuarioModel.create(nome_usuario, email, senha, foto_perfil)

            res.status(201).json({ id_usuario })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async read(req: Request, res: Response) {
        try {
            const { id_usuario } = req.params

            const usuarioModel = new UsuarioModel()
            const results = await usuarioModel.read(Number(id_usuario))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id_usuario } = req.params
            const { nome_usuario, email, senha, foto_perfil } = req.body

            const usuarioModel = new UsuarioModel()
            await usuarioModel.update(Number(id_usuario), nome_usuario, email, senha, foto_perfil)

            res.status(200).json({ mensagem: "Usuário atualizado com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id_usuario } = req.params

            const usuarioModel = new UsuarioModel()
            await usuarioModel.delete(Number(id_usuario))

            res.status(200).json({ mensagem: "Usuário deletado com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}