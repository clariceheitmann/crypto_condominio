const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`http://localhost:3000/condominios`,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
    })
    .then(res => {
        if(res.status === 401){
            localStorage.clear()
            alert('Sessão expirada!')
            location.href = '../index.html'
            throw new Error('Sessão expirada!')
        }
        return res.json()
    })
    .then(dados =>{
        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
        }else{
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
            `
        }
    })
    .catch((err)=>{
        console.error('Erro ao listar condomínio!',err)
        resposta.innerHTML = '<p>Erro ao listar condomínio!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codCondominio || el.id}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.cnpj}</td>`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código do Condomínio</th>
            <th>Nome</th>
            <th>CNPJ</th>
        </tr>
    </thead>
    `
}