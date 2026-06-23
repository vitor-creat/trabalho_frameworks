import { type Response, type Request } from "express";
import { Usuario } from "../model/usuarioModel.js";

export class UsuarioController {
    
    async create(req: Request, res: Response){
        const {nome, email, data_cadastro, foto_perfil} = req.body

        const usuario = await Usuario.create()

    }





}