import { type Response, type Request } from "express";
import { UsuarioModel } from "../model/usuarioModel.js";


const usuarioModel = new UsuarioModel()
export class UsuarioController {
    
    async create(req: Request, res: Response){
        try {
            const {nome, email, foto_perfil} = req.body
    
            const usuario = await usuarioModel.create(
                nome,
                email,
                foto_perfil
            )
            res.status(201).json(usuario)
        } catch (error) {
            
        }
    }

    async read(req:Request, res:Response){
        try {
            const {id} = req.params
            const usuario = await usuarioModel.read(Number(id))
            res.status(201).json(usuario)
        } catch (error) {
            
        }
    }

    async update(req: Request, res:Response){
        try {
            const {id, novoNome, novoEmail, foto_perfil} = req.body
            const usuario = await usuarioModel.update(
                id, 
                novoNome, 
                novoEmail, 
                foto_perfil
            )
            res.status(201).json(usuario)
        } catch (error) {
            
        }
    }

    async delete(req:Request, res: Response){
        try {
            const {id} = req.params
            await usuarioModel.delete(Number(id))

        } catch (error) {
            
        }

    }


}