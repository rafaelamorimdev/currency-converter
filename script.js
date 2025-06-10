let valorUsuario = document.querySelector("#valor")
let moedaUsuario = document.querySelector("#moedas")
let btn = document.querySelector("#btn")




function pegarMoeda() {
  
  const moeda = moedaUsuario.value
  
  let fetchAPI= fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
  .then((res) => res.json())
  .then((data) => {
    displayResultado(data, moeda)
  })
  
function displayResultado(data, moeda) {
  const chave = moeda.replace("-", "");
  const valorAtual = parseFloat(data[chave].bid);

  const simbolos = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£"
  };

  const moedaBase = moeda.split("-")[0]; 
  const simboloMoedaBase = simbolos[moedaBase] || moedaBase;

  const cotacaoUnitaria = valorAtual.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const valorDigitado = parseFloat(valorUsuario.value);
  const valorConvertido = (valorAtual * valorDigitado).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const divRes = document.querySelector(".display-res");
  const divContainer = document.querySelector(".container");
  divContainer.classList.add("style-container");

  divRes.innerHTML = `
    <div class="resultado">
      <p>1 ${simboloMoedaBase} = ${cotacaoUnitaria}</p>
      <p>${valorDigitado} ${simboloMoedaBase} = ${valorConvertido}</p>
    </div>`;
}
}



btn.addEventListener("click", pegarMoeda)