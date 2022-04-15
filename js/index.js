// botao irTopo
document.querySelector('#irTopo').addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
}))

// botao btnGrupos mostrar/ocultar divGrupos
document.querySelector('#btnGrupos').addEventListener('click', () => {
    document.querySelector('#divGrupo').classList.toggle('ocultar')
})

const ocultar = (elemento) => {
    document.querySelector(elemento).classList.add('ocultar')
}

const mostrar = (elemento) => {
    document.querySelector(elemento).classList.remove('ocultar')
}

// requisicao dos dados json
const verGrupos = () => {
    fetch('./grupos.json')
    .then(resposta => resposta.json())
    .then(dados => {
        //console.log(dados)
        // manipular os dados da requisicao
        // mapear o array de dados
        dados.map((grupo, index) => {
            criarCards()
            preencherDadosNosCards(grupo, index)
        }) // fim dados.map
    }) // fim then
} // fim verGrupos

// criar cards de grupos de selecoes
const criarCards = () => {
    // criar a estrutura do html e usar a clonagem
    let listaDeGrupo = document.querySelector('.listaDoGrupo').cloneNode(true)
    // usar o append
    document.querySelector('.listas').append(listaDeGrupo)
}

// preencher dados nos cards
const preencherDadosNosCards = (grupo, index) => {
    // destruturacao do grupo e selecoes
    let { grupo: ogrupo, selecao1, selecao2, selecao3, selecao4 } = grupo
    let [ bandeira1, pais1 ] = selecao1
    let [ bandeira2, pais2 ] = selecao2
    let [ bandeira3, pais3 ] = selecao3
    let [ bandeira4, pais4 ] = selecao4

    let tituloDoGrupo   = document.querySelectorAll('.tituloDoGrupo')
    let listaDeSelecoes = document.querySelectorAll('.listaDeSelecoes')

    tituloDoGrupo[index].innerHTML = `Grupo ${ogrupo}`
    listaDeSelecoes[index].innerHTML = `
    <li><img class='bandeirap' src='./images/bandeiras/${bandeira1}' alt='bandeira' /> ${pais1}</li>
    <li><img class='bandeirap' src='./images/bandeiras/${bandeira2}' alt='bandeira' /> ${pais2}</li>
    <li><img class='bandeirap' src='./images/bandeiras/${bandeira3}' alt='bandeira' /> ${pais3}</li>
    <li><img class='bandeirap' src='./images/bandeiras/${bandeira4}' alt='bandeira' /> ${pais4}</li>`
}

// executar verGrupos para criar os cards / section dos grupos e preencher os dados
verGrupos()

/////////////////////////// JOGOS ///////////////////////////
let url = ''
// requisicao dos dados json
const listarJogos = (url) => {
    return fetch(`jogos-${url}.json`)
    .then( resposta => resposta.json())
}

// cards das fase de grupos
const criarCardJogo = () => {
    let listaDeJogos = document.querySelector('.listaDeJogos').cloneNode(true)
    document.querySelector('.tabelaDeJogos').append(listaDeJogos)
    return listaDeJogos
}

const preencherCardJogos = (lista, jogo, indice) => {
    lista[indice].querySelector('.grupo').innerHTML = `Grupo ${jogo.grupo}` // muda nas rodadas finais
    lista[indice].querySelector('.data').innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`
    lista[indice].querySelector('.partida').innerHTML = `<img class="bandeirap" src="./images/bandeiras/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="bandeirap" src="./images/bandeiras/${jogo.visitante}" alt="" />`
    lista[indice].querySelector('.estadio').innerHTML = `${jogo.estadio}`
}

const renderizarJogos = (url) => {
    mostrar('#divRodadas')
    ocultar('#divFinais')
    ocultar('#divGrupo')

    listarJogos(url)
    .then(dado => {
        document.querySelector('.rodada').innerHTML = `${dado[0].rodada}ª rodada`
        dado.map((jogo, indice) => {
            // criando os cards
            preencherCardJogos(cardsRodadas, jogo, indice)
        })
    })
}

// criar cards para fase de grupo
let numeroDeJogos = 16
let cardsRodadas = []

for(let i = 0; i < numeroDeJogos; i++ ) {
    cardsRodadas[i] = criarCardJogo()
}
//console.log(cardsRodadas)

// const toggleGrupos = () => {
//     document.querySelector('.divGrupo').classList.add('ocultar')
// }

// renderizando a nossa tela 1ª rodada
renderizarJogos(1)

//// /RODADAS ////

////////// FASES ELIMINATORIAS /////////////
// clonar elemento e colocar no local
const criarCard = (elemento, local) => {
    let card = document.querySelector(elemento).cloneNode(true)
    document.querySelector(local).append(card)
    return card
}

const preencherCardJogosFinais = (lista, jogo, indice) => {
    lista[indice].querySelector('.fase').innerHTML = `${jogo.rodada}` // muda nas rodadas finais
    lista[indice].querySelector('.data').innerHTML = `${jogo.diaSemana} ${jogo.data} às ${jogo.hora}`
    lista[indice].querySelector('.partida').innerHTML = `<img class="bandeirap" src="./images/bandeiras/${jogo.mandante}" alt="" />
    ${jogo.partida}
    <img class="bandeirap" src="./images/bandeiras/${jogo.visitante}" alt="" />`
    lista[indice].querySelector('.estadio').innerHTML = `${jogo.estadio}`
}

// criar cards para fases finais
let numeroDeJogosFinais = 16
let cardsJogosFinais = []
for(let i = 0; i < numeroDeJogosFinais; i++ ) {
    cardsJogosFinais[i] = criarCard('.listaDeJogosFinais', '.tabelaDeJogosFinais')
}
//console.log(cardsJogosFinais)

const renderizarFinais = (url) => {
    mostrar('#divFinais')
    ocultar('#divRodadas')
    ocultar('#divGrupo')

    listarJogos(url)
    .then(dado => {
        //document.querySelector('.rodada').innerHTML = `Fase Final`
        dado.map((jogo, indice) => {
            //preencherCardJogos(cardsRodadas, jogo, indice)
            preencherCardJogosFinais(cardsJogosFinais, jogo, indice)
        })
    })
}

//renderizarFinais('oitavas')
