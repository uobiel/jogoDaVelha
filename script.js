const quadrados = document.querySelectorAll('.q');
const valorOelement = document.querySelector('#valorO');
const valorXelement = document.querySelector('#valorX');
const botaoReiniciar = document.querySelector('.botao');

let bolinha = true;
let valorBolinha = 0;
let valorXis = 0;

quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', function() {
        if (quadrado.innerHTML.trim() === '') {
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
            reiniciaJogo();
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
            reiniciaJogo();
            alteraPlacar(valorXelement ,valorXis);
        } else {
        reiniciaJogo()
    }
}

function reiniciaJogo(){
    for (let i = 0; i < 9; i++) {
        let quadrado = document.querySelector(`#q${i + 1}`);

        quadrado.innerHTML = '';
    }
}

function alteraPlacar(elemento, ponto){
    elemento.innerText = `${ponto}`;
}

botaoReiniciar.addEventListener('click', function(){
    valorOelement.innerText = '0';
    valorXelement.innerText = '0';
    valorBolinha = 0;
    valorXis = 0;
    reiniciaJogo();
})
