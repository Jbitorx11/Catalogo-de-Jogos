
import Jogo from '../models/Jogo.js';

import {
    validarId,
    validarTexto,
    validarAno
} from '../helpers/validacao.js';

import { tratarErro } from '../helpers/tratarErro.js';

class JogoController {

    // Listar todos os jogos
    static async listar(req, res) {
        try {
            const jogos = await Jogo.findAll();

            return res.status(200).json(jogos);

        } catch (erro) {
            return tratarErro(res, erro, 'listar os jogos');
        }
    }

    // Buscar jogo por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const jogo = await Jogo.findByPk(id);

            if (!jogo) {
                return res.status(404).json({
                    mensagem: 'Jogo não encontrado.'
                });
            }

            return res.status(200).json(jogo);

        } catch (erro) {
            return tratarErro(res, erro, 'buscar o jogo');
        }
    }

    // Cadastrar um novo jogo
    static async cadastrar(req, res) {
        try {
            const {
                nome,
                genero,
                ano,
                plataforma,
                desenvolvedora_id
            } = req.body;

            // Validar os campos de texto
            if (
                !validarTexto(nome) ||
                !validarTexto(genero) ||
                !validarTexto(plataforma)
            ) {
                return res.status(400).json({
                    mensagem:
                        'Nome, gênero e plataforma devem ser textos não vazios.'
                });
            }

            // Validar o ano de lançamento
            if (!validarAno(ano, 1950, 2100)) {
                return res.status(400).json({
                    mensagem:
                        'O ano deve ser um número inteiro entre 1950 e 2100.'
                });
            }

            // Validar o ID da desenvolvedora
            if (!validarId(String(desenvolvedora_id ?? ''))) {
                return res.status(400).json({
                    mensagem: 'O ID da desenvolvedora é inválido.'
                });
            }

            // Criar o jogo no banco de dados
            const novoJogo = await Jogo.create({
                nome: nome.trim(),
                genero: genero.trim(),
                ano: Number(ano),
                plataforma: plataforma.trim(),
                desenvolvedora_id: Number(desenvolvedora_id)
            });

            return res.status(201).json({
                mensagem: 'Jogo cadastrado com sucesso!',
                jogo: novoJogo
            });

        } catch (erro) {
            return tratarErro(res, erro, 'cadastrar o jogo');
        }
    }

    // Atualizar um jogo existente
    static async atualizar(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const jogo = await Jogo.findByPk(id);

            if (!jogo) {
                return res.status(404).json({
                    mensagem: 'Jogo não encontrado.'
                });
            }

            const {
                nome,
                genero,
                ano,
                plataforma,
                desenvolvedora_id
            } = req.body;

            // Validar os campos de texto
            if (
                !validarTexto(nome) ||
                !validarTexto(genero) ||
                !validarTexto(plataforma)
            ) {
                return res.status(400).json({
                    mensagem:
                        'Nome, gênero e plataforma devem ser textos não vazios.'
                });
            }

            // Validar o ano
            if (!validarAno(ano, 1950, 2100)) {
                return res.status(400).json({
                    mensagem:
                        'O ano deve ser um número inteiro entre 1950 e 2100.'
                });
            }

            // Validar o ID da desenvolvedora
            if (!validarId(String(desenvolvedora_id ?? ''))) {
                return res.status(400).json({
                    mensagem: 'O ID da desenvolvedora é inválido.'
                });
            }

            // Atualizar os dados do jogo
            await jogo.update({
                nome: nome.trim(),
                genero: genero.trim(),
                ano: Number(ano),
                plataforma: plataforma.trim(),
                desenvolvedora_id: Number(desenvolvedora_id)
            });

            return res.status(200).json({
                mensagem: 'Jogo atualizado com sucesso!',
                jogo
            });

        } catch (erro) {
            return tratarErro(res, erro, 'atualizar o jogo');
        }
    }

    // Excluir um jogo
    static async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const jogo = await Jogo.findByPk(id);

            if (!jogo) {
                return res.status(404).json({
                    mensagem: 'Jogo não encontrado.'
                });
            }

            await jogo.destroy();

            return res.status(200).json({
                mensagem: 'Jogo excluído com sucesso!'
            });

        } catch (erro) {
            return tratarErro(res, erro, 'excluir o jogo');
        }
    }
}

export default JogoController;
