import Desenvolvedora from '../models/Desenvolvedora.js';
import Jogo from '../models/Jogo.js';

import {
    validarId,
    validarTexto,
    validarAno
} from '../helpers/validacao.js';

import { tratarErro } from '../helpers/tratarErro.js';

class DesenvolvedoraController {

    // Listar todas as desenvolvedoras
    static async listar(req, res) {
        try {
            const desenvolvedoras = await Desenvolvedora.findAll();

            return res.status(200).json(desenvolvedoras);

        } catch (erro) {
            return tratarErro(res, erro, 'listar as desenvolvedoras');
        }
    }

    // Buscar desenvolvedora por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const desenvolvedora = await Desenvolvedora.findByPk(id);

            if (!desenvolvedora) {
                return res.status(404).json({
                    mensagem: 'Desenvolvedora não encontrada.'
                });
            }

            return res.status(200).json(desenvolvedora);

        } catch (erro) {
            return tratarErro(res, erro, 'buscar a desenvolvedora');
        }
    }

    // Cadastrar uma desenvolvedora
    static async cadastrar(req, res) {
        try {
            const { nome, pais, anoFundacao } = req.body;

            if (!validarTexto(nome) || !validarTexto(pais)) {
                return res.status(400).json({
                    mensagem:
                        'Nome e país devem ser textos não vazios.'
                });
            }

            const anoAtual = new Date().getFullYear();

            if (!validarAno(anoFundacao, 1800, anoAtual)) {
                return res.status(400).json({
                    mensagem:
                        `O ano de fundação deve ser um número inteiro entre 1800 e ${anoAtual}.`
                });
            }

            const novaDesenvolvedora = await Desenvolvedora.create({
                nome: nome.trim(),
                pais: pais.trim(),
                anoFundacao: Number(anoFundacao)
            });

            return res.status(201).json({
                mensagem: 'Desenvolvedora cadastrada com sucesso!',
                desenvolvedora: novaDesenvolvedora
            });

        } catch (erro) {
            return tratarErro(
                res,
                erro,
                'cadastrar a desenvolvedora'
            );
        }
    }

    // Atualizar uma desenvolvedora
    static async atualizar(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const desenvolvedora = await Desenvolvedora.findByPk(id);

            if (!desenvolvedora) {
                return res.status(404).json({
                    mensagem: 'Desenvolvedora não encontrada.'
                });
            }

            const { nome, pais, anoFundacao } = req.body;

            if (!validarTexto(nome) || !validarTexto(pais)) {
                return res.status(400).json({
                    mensagem:
                        'Nome e país devem ser textos não vazios.'
                });
            }

            const anoAtual = new Date().getFullYear();

            if (!validarAno(anoFundacao, 1800, anoAtual)) {
                return res.status(400).json({
                    mensagem:
                        `O ano de fundação deve ser um número inteiro entre 1800 e ${anoAtual}.`
                });
            }

            await desenvolvedora.update({
                nome: nome.trim(),
                pais: pais.trim(),
                anoFundacao: Number(anoFundacao)
            });

            return res.status(200).json({
                mensagem: 'Desenvolvedora atualizada com sucesso!',
                desenvolvedora
            });

        } catch (erro) {
            return tratarErro(
                res,
                erro,
                'atualizar a desenvolvedora'
            );
        }
    }

    // Excluir uma desenvolvedora
    static async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const desenvolvedora = await Desenvolvedora.findByPk(id);

            if (!desenvolvedora) {
                return res.status(404).json({
                    mensagem: 'Desenvolvedora não encontrada.'
                });
            }

            // Verificar se existem jogos associados
            const quantidadeJogos = await Jogo.count({
                where: {
                    desenvolvedora_id: id
                }
            });

            if (quantidadeJogos > 0) {
                return res.status(409).json({
                    mensagem:
                        'Não é possível excluir esta desenvolvedora, pois existem jogos associados a ela.',
                    quantidadeJogos
                });
            }

            await desenvolvedora.destroy();

            return res.status(200).json({
                mensagem: 'Desenvolvedora excluída com sucesso!'
            });

        } catch (erro) {
            return tratarErro(
                res,
                erro,
                'excluir a desenvolvedora'
            );
        }
    }

    // Listar os jogos de uma desenvolvedora
    static async listarJogos(req, res) {
        try {
            const { id } = req.params;

            if (!validarId(id)) {
                return res.status(400).json({
                    mensagem: 'O ID informado é inválido.'
                });
            }

            const desenvolvedora = await Desenvolvedora.findByPk(id);

            if (!desenvolvedora) {
                return res.status(404).json({
                    mensagem: 'Desenvolvedora não encontrada.'
                });
            }

            const jogos = await Jogo.findAll({
                where: {
                    desenvolvedora_id: id
                }
            });

            return res.status(200).json({
                desenvolvedora: desenvolvedora.nome,
                totalJogos: jogos.length,
                jogos
            });

        } catch (erro) {
            return tratarErro(
                res,
                erro,
                'listar os jogos da desenvolvedora'
            );
        }
    }
}

export default DesenvolvedoraController;
