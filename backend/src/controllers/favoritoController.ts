import type { Request, Response } from "express"
import { FavoritoModel } from "../model/favoritoModel.js"

export class FavoritoController{
    async favoritar(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario, tb_anime_id_anime } = req.body

            const favoritoModel = new FavoritoModel()
            const insertId = await favoritoModel.favoritar(tb_usuario_id_usuario, tb_anime_id_anime)

            res.status(201).json({ id_favorito: insertId })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async readByUser(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario } = req.params

            const favoritoModel = new FavoritoModel()
            const results = await favoritoModel.readByUser(Number(tb_usuario_id_usuario))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario, tb_anime_id_anime } = req.params

            const favoritoModel = new FavoritoModel()
            await favoritoModel.delete(Number(tb_usuario_id_usuario), Number(tb_anime_id_anime))

            res.status(200).json({ mensagem: "Favorito removido com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}