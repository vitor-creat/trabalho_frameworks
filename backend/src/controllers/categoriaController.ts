import type { Request, Response } from "express"
import { CategoriaModel } from "../model/categoriasModel.js"

export class CategoriaController{
    async create(req: Request, res: Response) {
        try {
            const { id_categoria, nome } = req.body

            const categoriaModel = new CategoriaModel()
            const insertId = await categoriaModel.create(id_categoria, nome)

            res.status(201).json({ id_categoria: insertId })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async read(req: Request, res: Response) {
        try {
            const categoriaModel = new CategoriaModel()
            const results = await categoriaModel.read()

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params
            const { nome } = req.body

            const categoriaModel = new CategoriaModel()
            await categoriaModel.update(Number(id_categoria), nome)

            res.status(200).json({ mensagem: "Categoria atualizada com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params

            const categoriaModel = new CategoriaModel()
            await categoriaModel.delete(Number(id_categoria))

            res.status(200).json({ mensagem: "Categoria deletada com sucesso" })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async quantidadeAnimes(req: Request, res: Response) {
        try {
            const categoriaModel = new CategoriaModel()
            const results = await categoriaModel.quantidadeAnimes()

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }

    async categoriasPopulares(req: Request, res: Response) {
        try {
            const categoriaModel = new CategoriaModel()
            const results = await categoriaModel.categoriasPopulares()

            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno do servidor" })
        }
    }
}