
import { ValidationError, ForeignKeyConstraintError } from 'sequelize';

// Tratar erros e retornar o status HTTP adequado
export function tratarErro(res, erro, operacao) {

    // Erros de validação dos modelos
    if (erro instanceof ValidationError) {
        return res.status(400).json({
            erro: `Dados inválidos ao ${operacao}.`,
            detalhes: erro.errors.map((item) => item.message)
        });
    }

    // Erros de chave estrangeira
    if (erro instanceof ForeignKeyConstraintError) {
        return res.status(400).json({
            erro: 'Relacionamento inválido.',
            mensagem:
                'A desenvolvedora informada não existe ou o registro está relacionado a outros dados.'
        });
    }

    // Outros erros inesperados
    return res.status(500).json({
        erro: `Erro interno ao ${operacao}.`,
        detalhes: erro.message
    });
}
