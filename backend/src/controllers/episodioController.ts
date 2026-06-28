import type { Request, Response } from "express"
import { EpisodioModel } from "../model/episodioModel.js"

export class EpisodioController{
    async create(req: Request, res: Response) {
        try {
            const { id_episodio, titulo, numero, duracao, url_video, id_anime } = req.body

            const episodioModel = new EpisodioModel()
            const insertId = await episodioModel.create(id_episodio, titulo, numero, duracao, url_video, id_anime)

            res.status(201).json({ id_episodio: insertId })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async readByAnime(req: Request, res: Response) {
        try {
            const { id_anime } = req.params

            const episodioModel = new EpisodioModel()
            const results = await episodioModel.readByAnime(Number(id_anime))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id_episodio } = req.params
            const { titulo, numero, duracao, url_video, id_anime } = req.body

            const episodioModel = new EpisodioModel()
            await episodioModel.update(Number(id_episodio), titulo, numero, duracao, url_video, id_anime)

            res.status(200).json({ mensagem: "Episódio atualizado com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id_episodio } = req.params

            const episodioModel = new EpisodioModel()
            await episodioModel.delete(Number(id_episodio))

            res.status(200).json({ mensagem: "Episódio deletado com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}