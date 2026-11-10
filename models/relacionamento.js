
import Jogo from './Jogo.js';
import Desenvolvedora from './Desenvolvedora.js';

Desenvolvedora.hasMany(Jogo, {
    foreignKey: 'desenvolvedora_id',
    as: 'jogos',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Jogo.belongsTo(Desenvolvedora, {
    foreignKey: 'desenvolvedora_id',
    as: 'desenvolvedora',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

export { Jogo, Desenvolvedora };
