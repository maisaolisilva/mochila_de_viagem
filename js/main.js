/*referência a tag form*/
const form = document.getElementById('novoItem')
/*referencia a lista */
const lista = document.getElementById('lista')

/*pega os itens salvos no local storage(transformados em array com o JSON.parse()) ou cria um array vazio se não tiver nada salvo */
const itens = JSON.parse(localStorage.getItem('itens')) || []

/*toda vez que a página recarregar, a lista será refeita a partir do que foi armazenado no localStorage */
itens.forEach(element => {
  criaItem(element)
});

/*função que cria um novo item */
function criaItem(item){

    /*cria uma tag item de lista */
    const novoItem = document.createElement('li')
    novoItem.classList.add('item') /*adiciona a classe item */

    /*cria uma tag strong com a quantidade digitada */
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id //cria um data-id

    /*adiciona o <strong> dentro do <li> */
    novoItem.appendChild(numeroItem)
    /*escreve o nome depois do <strong>, dentro do li */  
    novoItem.innerHTML += item.nome 

    //Adicionando o botão ao item
    novoItem.appendChild(botaoDeleta(item.id)) //envia o id que é o número do índice do elemento no array itens

    /*adiciona o item à lista */
    lista.appendChild(novoItem)

}

/*Função que atualiza um item */
function atualizaItem(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

/*Função que cria o botão para deletar um item */
function botaoDeleta(id){
  const botao = document.createElement('button')
  botao.innerText = 'X'
  botao.addEventListener('click', function(){
    deletaElemento(this.parentNode, id) //this faz referência ao elemento que foi clicado
  })
  return botao
}

/*Função que remove item */
function deletaElemento(tag, id){
  tag.remove()//remove o item da tela
  itens.splice(itens.findIndex(element => element.id == id), 1)//remove o item do array itens
  localStorage.setItem("itens", JSON.stringify(itens))//manda para o localStorege o array atualizado
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  /*const que verifica se o item já existe na lista */
  const existe = itens.find(element => element.nome.toUpperCase()===nome.value.toUpperCase())

  /*criação de objeto com as informações do item */
  const itemAtual = {
  "nome": nome.value,
  "quantidade": quantidade.value
  }

  if (existe) {
    itemAtual.id = existe.id //item digitado recebe o mesmo id no item retornado na const existe
    atualizaItem(itemAtual)
    itens[itens.findIndex(element => element.id === existe.id)] = itemAtual //atualiza o item no array
  }else {
    criaItem(itemAtual)
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1].id) + 1 : 0;

    /*Adicionando o objeto ao array de itens */
    itens.push(itemAtual)
  }

  /*Limpando os campos de imput */
  nome.value = ""
  quantidade.value = ""
 
  /*salvando o array acrescido do novo item */
  localStorage.setItem("itens", JSON.stringify(itens)) /*localStorage salva par chave e valor*/

  document.location.reload() //recarrega a página
})

