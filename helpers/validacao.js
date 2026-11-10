// Validar se um ID é um número inteiro positivo
export function validarId(id) {
    return /^[1-9]\d*$/.test(id);
}

// Validar se um texto é válido
export function validarTexto(valor) {
    return (
        typeof valor === 'string' &&
        valor.trim().length > 0
    );
}

// Validar se um ano é um número inteiro dentro de um intervalo
export function validarAno(ano, minimo, maximo) {
    const numero = Number(ano);

    return (
        ano !== '' &&
        ano !== null &&
        ano !== undefined &&
        Number.isInteger(numero) &&
        numero >= minimo &&
        numero <= maximo
    );
}