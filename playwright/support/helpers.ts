export function gerarCodigoAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const alfanumericos = letras + numeros;

    function aleatorio(caracteres) {
        return caracteres[Math.floor(Math.random() * caracteres.length)];
    }

    const prefixo = Array.from({ length: 3 }, () => aleatorio(letras)).join('');
    const numerosCodigo = Array.from({ length: 2 }, () => aleatorio(numeros)).join('');
    const sufixo = Array.from({ length: 3 }, () => aleatorio(alfanumericos)).join('');

    return `${prefixo}-${numerosCodigo}${sufixo}`;
}