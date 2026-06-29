import { Router } from "express"

import { AnimeController } from "../controllers/animeController.js"
import { UsuarioController } from "../controllers/usuarioController.js"
import { AvaliacaoController } from "../controllers/avaliacaoController.js"
import { CategoriaController } from "../controllers/categoriaController.js"
import { EpisodioController } from "../controllers/episodioController.js"
import { FavoritoController } from "../controllers/favoritoController.js"

const router = Router()

const animeController = new AnimeController()
const usuarioController = new UsuarioController()
const avaliacaoController = new AvaliacaoController()
const categoriaController = new CategoriaController()
const episodioController = new EpisodioController()
const favoritoController = new FavoritoController()

//rotas anime
router.post("/animes", (req, res) => animeController.create(req, res))
router.get("/animes/buscar", (req, res) => animeController.getAnimeByName(req, res))
router.get("/animes/categoria/:id_categoria", (req, res) => animeController.getAnimeByCategoria(req, res))
router.get("/animes/:id_anime/detalhes", (req, res) => animeController.detalhes(req, res))
router.get("/animes/melhores-que-a-media", (req, res) => animeController.melhoresQueAMedia(req, res))
router.get("/animes/sem-avaliacoes", (req, res) => animeController.semAvaliacoes(req, res))

//rotas usuario
router.post("/usuarios", (req, res) => usuarioController.create(req, res))
router.get("/usuarios/:id_usuario", (req, res) => usuarioController.read(req, res))
router.put("/usuarios/:id_usuario", (req, res) => usuarioController.update(req, res))
router.delete("/usuarios/:id_usuario", (req, res) => usuarioController.delete(req, res))

// rotas avaliações
router.post("/avaliacoes", (req, res) => avaliacaoController.avaliar(req, res))
router.get("/avaliacoes/usuario/:tb_usuario_id_usuario", (req, res) => avaliacaoController.readByUser(req, res))
router.get("/avaliacoes/anime/:tb_anime_id_anime", (req, res) => avaliacaoController.readByAnime(req, res))
router.put("/avaliacoes/:tb_usuario_id_usuario/:tb_anime_id_anime", (req, res) => avaliacaoController.editarAvaliacao(req, res))
router.delete("/avaliacoes/:tb_usuario_id_usuario/:tb_anime_id_anime", (req, res) => avaliacaoController.apagarAvaliacao(req, res))

//rotas categorias
router.post("/categorias", (req, res) => categoriaController.create(req, res))
router.get("/categorias", (req, res) => categoriaController.read(req, res))
router.put("/categorias/:id_categoria", (req, res) => categoriaController.update(req, res))
router.delete("/categorias/:id_categoria", (req, res) => categoriaController.delete(req, res))
router.get("/categorias/quantidade-animes", (req, res) => categoriaController.quantidadeAnimes(req, res))
router.get("/categorias/populares", (req, res) => categoriaController.categoriasPopulares(req, res))

//rotas episodios
router.post("/episodios", (req, res) => episodioController.create(req, res))
router.get("/episodios/anime/:id_anime", (req, res) => episodioController.readByAnime(req, res))
router.put("/episodios/:id_episodio", (req, res) => episodioController.update(req, res))
router.delete("/episodios/:id_episodio", (req, res) => episodioController.delete(req, res))

//rotas favoritos
router.post("/favoritos", (req, res) => favoritoController.favoritar(req, res))
router.get("/favoritos/usuario/:tb_usuario_id_usuario", (req, res) => favoritoController.readByUser(req, res))
router.delete("/favoritos/:tb_usuario_id_usuario/:tb_anime_id_anime", (req, res) => favoritoController.delete(req, res))

export default router