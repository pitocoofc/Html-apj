// /interpreters/brainfuck.js

export function run(codigoCompleto) {
    // Removemos a primeira linha (o identificador 'language ...')
    const linhas = codigoCompleto.split('\n');
    const codigo = linhas.slice(1).join(''); 

    let memoria = new Uint8Array(30000); // 30k células de memória
    let ptr = 0; // Ponteiro de dados
    let pc = 0;  // Program Counter (Ponteiro do código)
    let output = "";

    // Limpa o código para aceitar apenas os 8 comandos válidos
    const comandos = codigo.replace(/[^><\+\-\.\[\]]/g, '');

    while (pc < comandos.length) {
        let comando = comandos[pc];

        switch (comando) {
            case '>': ptr++; break;
            case '<': ptr--; break;
            case '+': memoria[ptr]++; break;
            case '-': memoria[ptr]--; break;
            case '.': output += String.fromCharCode(memoria[ptr]); break;
            case '[':
                if (memoria[ptr] === 0) {
                    let loop = 1;
                    while (loop > 0) {
                        pc++;
                        if (comandos[pc] === '[') loop++;
                        if (comandos[pc] === ']') loop--;
                    }
                }
                break;
            case ']':
                if (memoria[ptr] !== 0) {
                    let loop = 1;
                    while (loop > 0) {
                        pc--;
                        if (comandos[pc] === '[') loop--;
                        if (comandos[pc] === ']') loop++;
                    }
                }
                break;
        }
        pc++;
    }

    // Exibe o resultado no terminal do seu HTML
    const consoleOut = document.getElementById('console-output');
    consoleOut.innerHTML = `<span style="color: #2ecc71"> > Output:</span> ${output}`;
      }
