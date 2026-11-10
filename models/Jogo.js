
import { DataTypes } from 'sequelize';
import banco from '../config/banco.js';

const Jogo = banco.define('Jogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome do jogo é obrigatório.'
            }
        }
    },

    genero: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1950],
                msg: 'O ano do jogo deve ser igual ou superior a 1950.'
            },
            max: {
                args: [2100],
                msg: 'O ano do jogo não pode ser superior a 2100.'
            }
        }
    },

    plataforma: {
        type: DataTypes.STRING(60),
        allowNull: false
    },

    desenvolvedora_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'jogos',
    timestamps: false
});

export default Jogo;
