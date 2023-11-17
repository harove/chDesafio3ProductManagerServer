export function notNull(valor, variable) {
    if (!valor) throw new Error(`null value ${variable}`);
    return valor;
}

