const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./assests/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./assests/reprovado.png" alt="Emoji triste" />';
const notaMinima = 7;

const notas = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    const nota = parseFloat(inputNotaAtividade.value);

    // Adiciona a nota ao array
    notas.push(nota);

    // Adiciona nova linha à tabela
    const linha = document.createElement('tr');
    linha.innerHTML = `
        <td>${inputNomeAtividade.value}</td>
        <td>${nota.toFixed(1).replace('.', ',')}</td>
        <td>${nota >= notaMinima ? imgAprovado : imgReprovado}</td>
    `;

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.appendChild(linha);

    // Atualiza o rodapé com a média
    atualizarMedia();

    // Limpa os campos
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
});

function atualizarMedia() {
    const media = calcularMedia();
    const tfoot = document.querySelector('tfoot');

    const status = media >= notaMinima ? 'Aprovado' : 'Reprovado';
    const classe = media >= notaMinima ? 'aprovado' : 'reprovado';

    tfoot.innerHTML = `
        <tr>
            <td>Média Final</td>
            <td>${media.toFixed(1).replace('.', ',')}</td>
            <td><span class="resultado ${classe}">${status}</span></td>
        </tr>
    `;
}

function calcularMedia() {
    let soma = 0;
    for (let nota of notas) {
        soma += nota;
    }
    return soma / notas.length;
}
