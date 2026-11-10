
import Jogo from './Jogo.js';
import Desenvolvedora from './Desenvolvedora.js';

// Uma desenvolvedora pode ter vários jogos
Desenvolvedora.hasMany(Jogo, {
    foreignKey: 'desenvolvedora_id',
    as: 'jogos',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

// Cada jogo pertence a uma desenvolvedora
Jogo.belongsTo(Desenvolvedora, {
    foreignKey: 'desenvolvedora_id',
    as: 'desenvolvedora',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

export { Jogo, Desenvolvedora };
