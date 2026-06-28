import type { Request, Response } from "express"
import { AvaliacaoModel } from "../model/avaliacaoModel.js"

export class AvaliacaoController{
    async avaliar(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario, tb_anime_id_anime, nota, comentario } = req.body

            const avaliacaoModel = new AvaliacaoModel()
            const id_avaliacao = await avaliacaoModel.avaliar(tb_usuario_id_usuario, tb_anime_id_anime, nota, comentario)

            res.status(201).json({ id_avaliacao })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async readByUser(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario } = req.params

            const avaliacaoModel = new AvaliacaoModel()
            const results = await avaliacaoModel.readByUser(Number(tb_usuario_id_usuario))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async readByAnime(req: Request, res: Response) {
        try {
            const { tb_anime_id_anime } = req.params

            const avaliacaoModel = new AvaliacaoModel()
            const results = await avaliacaoModel.readByAnime(Number(tb_anime_id_anime))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async editarAvaliacao(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario, tb_anime_id_anime } = req.params
            const { nota, comentario } = req.body

            const avaliacaoModel = new AvaliacaoModel()
            await avaliacaoModel.editarAvaliacao(Number(tb_usuario_id_usuario), Number(tb_anime_id_anime), nota, comentario)

            res.status(200).json({ mensagem: "Avaliação atualizada com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async apagarAvaliacao(req: Request, res: Response) {
        try {
            const { tb_usuario_id_usuario, tb_anime_id_anime } = req.params

            const avaliacaoModel = new AvaliacaoModel()
            await avaliacaoModel.apagarAvaliacao(Number(tb_usuario_id_usuario), Number(tb_anime_id_anime))

            res.status(200).json({ mensagem: "Avaliação deletada com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}