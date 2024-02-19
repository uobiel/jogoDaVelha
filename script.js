const quadrados = document.querySelectorAll('.q');
const valorOelement = document.querySelector('#valorO');
const valorXelement = document.querySelector('#valorX');
const botaoReiniciar = document.querySelector('.botao');
const modal = document.querySelector('.fade');
const jogarNovamenteButton = document.querySelector('#jogaNovamenteButton');
const reiniciarJogobutton = document.querySelector('#reiniciaButton');
const telaInformativa = document.querySelector('.fadeWin');
const adicionaTextoElement = document.querySelector('.texto-informativo');
const jogaNovamenteButtonInfo = document.querySelector('#jogaNovamenteButtonInfo');
const zeraPlacarButton = document.querySelector('#zeraPlacarButton');
const placarX = document.querySelector('.placarX');
const placarB = document.querySelector('.placarB');

let bolinha = true;
let valorBolinha = 0;
let valorXis = 0;
let velha = false;

let bloquearCliques = false; 

quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', function() {
        if (!bloquearCliques && quadrado.innerHTML.trim() === '') {
            if (bolinha) {
                quadrado.innerHTML = `<p>O</p>`;
                checaVitoria();
            } else {
                quadrado.innerHTML = `<p>X</p>`;
                checaVitoria();
            }
            bolinha = !bolinha;
        }
    });
});

function bloqueiaCliques() {
    bloquearCliques = true;
}

function desbloqueiaCliques() {
    bloquearCliques = false;
}

function checaVitoria() {
    let q = [false, false, false, false, false, false, false, false, false];
    let o = [false, false, false, false, false, false, false, false, false];

    for (let i = 0; i < 9; i++) {
        let quadrado = document.querySelector(`#q${i + 1}`);

        if (quadrado.innerHTML === '<p>O</p>') {
            q[i] = true;
        } else if(quadrado.innerHTML === '<p>X</p>') {
            o[i] = true;
        }
    }

    validaVitoria(q, o);
}

function validaVitoria(q, o){
    if (q[0] && q[1] && q[2] ||
        q[3] && q[4] && q[5] ||
        q[6] && q[7] && q[8] ||
        q[0] && q[3] && q[6] ||
        q[0] && q[4] && q[8] ||
        q[1] && q[4] && q[7] ||
        q[2] && q[4] && q[6] ||
        q[2] && q[5] && q[8]) {
            console.log('Bolinha ganhou!');
            valorBolinha++;
            console.log(`Valor bolinha ${valorBolinha}`);
            bloqueiaCliques();
            tempoEspera(() => exibeTelaInformativa("BOLINHA GANHOU"), 1000);
            alteraPlacar(valorOelement, valorBolinha);
    } else if (o[0] && o[1] && o[2] ||
        o[3] && o[4] && o[5] ||
        o[6] && o[7] && o[8] ||
        o[0] && o[3] && o[6] ||
        o[0] && o[4] && o[8] ||
        o[1] && o[4] && o[7] ||
        o[2] && o[4] && o[6] ||
        o[2] && o[5] && o[8]){
            console.log('Xis ganhou!');
            valorXis++;
            console.log(`Valor xis ${valorXis}`);
            bloqueiaCliques();
            tempoEspera(() => exibeTelaInformativa("XIS GANHOU"), 1000);
            alteraPlacar(valorXelement ,valorXis);
        }
        else {
            checaVelha();
        }
}

function reiniciaJogo(){
    bloquearCliques = false;
    
    for (let i = 0; i < 9; i++) {
        let quadrado = document.querySelector(`#q${i + 1}`);

        quadrado.innerHTML = '';
    }
}

function alteraPlacar(elemento, ponto){
    elemento.innerText = `${ponto}`;
}

botaoReiniciar.addEventListener('click', function(){
    desbloqueiaCliques();
    zeraJogo();
})

function zeraJogo(){
    valorOelement.innerText = '0';
    valorXelement.innerText = '0';
    valorBolinha = 0;
    valorXis = 0;
    reiniciaJogo();
}

function checaVelha() {
    let empate = true;
    quadrados.forEach(quadrado => {
        if (quadrado.innerHTML.trim() === '') {
            empate = false;
        }
    });

    if (empate) {
        exibeTelaInformativa('DEU VELHA :(')
    }
}

function tempoEspera(funcao, tempo){
    setTimeout(funcao, tempo);
}

function exibeTelaInformativa(texto){
    adicionaTextoElement.innerHTML = `<p>${texto}</p>`
    telaInformativa.style.display = 'flex';
    placarX.innerHTML = `<p>X = ${valorXis}</p>`;
    placarB.innerHTML = `<p>O = ${valorBolinha}</p>`
    jogaNovamenteButtonInfo.addEventListener('click', function(){
        reiniciaJogo();
        telaInformativa.style.display = 'none';
    })

    zeraPlacarButton.addEventListener('click', function(){
        reiniciaJogo();
        zeraJogo();
        telaInformativa.style.display = 'none';
    })
}