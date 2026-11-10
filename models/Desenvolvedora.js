
import { DataTypes } from 'sequelize';
import banco from '../config/banco.js';

const Desenvolvedora = banco.define('Desenvolvedora', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome da desenvolvedora é obrigatório.'
            }
        }
    },

    pais: {
        type: DataTypes.STRING(60),
        allowNull: false
    },

    anoFundacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ano_fundacao'
    }
}, {
    tableName: 'desenvolvedoras',
    timestamps: false
});

export default Desenvolvedora;
