
import express from 'express';
import 'dotenv/config';

import banco from './config/banco.js';

// Carregar os models e seus relacionamentos
import './models/relacionamentos.js';

// Importar as rotas
import desenvolvedoraRoutes from './routes/desenvolvedora.js';
import jogoRoutes from './routes/jogo.js';

const app = express();

app.use(express.json());

// Rotas da API
app.use('/desenvolvedoras', desenvolvedoraRoutes);
app.use('/jogos', jogoRoutes);

// Rota inicial
app.get('/', (req, res) => {
    return res.status(200).json({
        mensagem: 'API Catálogo de Jogos funcionando!'
    });
});

// Inicializar servidor e banco de dados
const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await banco.authenticate();
        console.log('Conexão com MariaDB estabelecida!');

        await banco.sync();
        console.log('Models sincronizados com o banco de dados!');

        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    } catch (erro) {
        console.error('Erro ao iniciar a API:', erro.message);
    }
}

iniciarServidor();
