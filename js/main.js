const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (element) => {
    coletaDados(element)
})

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    const existe = itens.find(elemento => elemento.nome === nome.value)
    if(existe){
        itemAtual.id = existe.id
        atualizaDados(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;

        coletaDados(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value=""
    quantidade.value=""
})

function coletaDados(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const quantidadeItem = document.createElement('strong')
    quantidadeItem.innerHTML = item.quantidade
    quantidadeItem.dataset.id = item.id

    novoItem.appendChild(quantidadeItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDelete(item.id))

    lista.appendChild(novoItem)
}

function atualizaDados(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDelete(id){
    const botao = document.createElement("button")
    botao.innerText = "x"

    botao.addEventListener("click", function(){
        deletaItem(this.parentNode, id)
    })

    return botao
}

function deletaItem(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}

//1- Interromper o comportamento do formulário de enviar informações para a página como preventDefault;
//2- Capturar dados do formulário com target.elements['nome do input'] com o botão adicionar;
//3- Criar um elemento a partir dos dados com função;
//4- Limpar input após envio;
//5- Refatorar código com adição de variáveis;
//6- Armazenar valores do form em local storage;
//7- Transformar items do local storage em objects dentro de um array ('array'.push('object')) para evitar sobrescrição e usar JSON.stringfy para transforma-la de objeto para string no envio;
//8- Verificar no carregamento da página se há itens no local storage com getItem na array, e quando houver, tranforma-los em array novamente para adição posterior na página;
//9- Consultar array no recarregamento com for each e refatorar responsabilidades;
//10- Consultar se um elemento existe na array após envio de formulário por '.find'. Se existir, atualizar elemento por função. Se não existir, criar elemento com id (.lenght) e inserir na lista (.push);
//11- Criar função para criar um botao de deletar dentro do html e ter um addEventListener para remover o itemAtual com função deleta elemento com parâmetro this.parentNode quando for chamada;
//12- Chamar a função de botao com novoItem.appendChild('function');