
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const banco = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mariadb',
        logging: false
    }
);

export default banco;
