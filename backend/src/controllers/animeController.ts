import type { Request, Response } from "express"
import { AnimeModel } from "../model/animeModel.js"

export class AnimeController{
    async create(req: Request, res: Response) {
        try {
            const { titulo, sinopse, ano_lancamento, status, capa, id_categorias } = req.body

            const animeModel = new AnimeModel()
            const id_anime = await animeModel.create(titulo, sinopse, ano_lancamento, status, capa, id_categorias)

            res.status(201).json({ id_anime })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async getAnimeByName(req: Request, res: Response) {
        try {
            const { titulo } = req.query

            const animeModel = new AnimeModel()
            const results = await animeModel.getAnimeByName(titulo as string)

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async getAnimeByCategoria(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params

            const animeModel = new AnimeModel()
            const results = await animeModel.getAnimeByCategoria(Number(id_categoria))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async detalhes(req: Request, res: Response) {
        try {
            const { id_anime } = req.params

            const animeModel = new AnimeModel()
            const results = await animeModel.detalhes(Number(id_anime))

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async melhoresQueAMedia(req: Request, res: Response) {
        try {
            const animeModel = new AnimeModel()
            const results = await animeModel.melhoresQueAMedia()

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async semAvaliacoes(req: Request, res: Response) {
        try {
            const animeModel = new AnimeModel()
            const results = await animeModel.semAvaliacoes()

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}