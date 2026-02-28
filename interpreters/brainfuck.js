// /interpreters/brainfuck.js

export function run(codigoCompleto) {

    const linhas = codigoCompleto.split('\n');
    const codigo = linhas.slice(1).join('');

    let memoria = new Uint8Array(30000);
    let ptr = 0;
    let pc = 0;
    let output = "";

    const comandos = codigo.replace(/[^><\+\-\.\[\]]/g, '');

    const consoleOut = document.getElementById('console-output');

    try {

        while (pc < comandos.length) {

            let comando = comandos[pc];

            switch (comando) {

                case '>':
                    ptr++;
                    if (ptr >= memoria.length) {
                        throw new Error("Ponteiro ultrapassou limite de memória.");
                    }
                    break;

                case '<':
                    ptr--;
                    if (ptr < 0) {
                        throw new Error("Ponteiro negativo.");
                    }
                    break;

                case '+':
                    memoria[ptr]++;
                    break;

                case '-':
                    memoria[ptr]--;
                    break;

                case '.':
                    output += String.fromCharCode(memoria[ptr]);
                    break;

                case '[':
                    if (memoria[ptr] === 0) {
                        let loop = 1;
                        while (loop > 0) {
                            pc++;
                            if (pc >= comandos.length) {
                                throw new Error("Loop '[' sem fechamento ']'.");
                            }
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
                            if (pc < 0) {
                                throw new Error("Loop ']' sem abertura '['.");
                            }
                            if (comandos[pc] === '[') loop--;
                            if (comandos[pc] === ']') loop++;
                        }
                    }
                    break;
            }

            pc++;
        }

        consoleOut.innerHTML =
            `<span style="color: #2ecc71"> > Output:</span> ${output || "(sem saída)"}`;

    } catch (erro) {
        consoleOut.innerHTML =
            `<span style="color: red">Erro Brainfuck:</span> ${erro.message}`;
    }
}
