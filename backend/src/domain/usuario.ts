export interface UsuarioProps{
    id?: number | undefined
    nome: string
    senha: string
    data_cadastro: string
    profile_photo: string

}

export class Usuario {
    id?: number | undefined
    nome: string
    senha: string
    data_cadastro: Date
    profile_photo: string

    constructor(props: UsuarioProps) {
     this.id = props.id
     this.nome = props.nome
     this.senha = props.senha
     this.data_cadastro = new Date(props.data_cadastro)
     this.profile_photo = props.profile_photo   
    }
    
}