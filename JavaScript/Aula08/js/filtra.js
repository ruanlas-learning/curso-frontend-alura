
var campoFiltro = document.querySelector("#filtrar-tabela");
campoFiltro.addEventListener("input", function(){ //está adicionando o evento de entrada ('input'). Este evento será
                                                  //chamado toda vez que algum caractere for digitado neste campo
    var valorDigitado = this.value;
    var listTrPacientes = document.querySelectorAll(".paciente");

    if(valorDigitado.length > 0){
        //se o campo conter algum caractere, seu tamanho será maior que 0
        listTrPacientes.forEach(function(trPaciente){
            var tdNome = trPaciente.querySelector(".info-nome");
            var nomePaciente = tdNome.textContent;

            //Este trecho abaixo define uma expressão regular (Regular Expression) para poder buscar
            //por um trecho em uma string, ou seja, permite identificar se uma sequencia de caracteres
            //está contida em uma string que estiver sendo verificada
            var findExpressao = new RegExp(valorDigitado, "i"); //RegExp( expressaoPadrao, flag ) 
                                                                //Na 'expressaoPadrao' passamos a sequencia de caracteres que querermos 
                                                                                        // verificar se está contida em alguma coisa
                                                                // [ flag "i" -> 'insensitive' = não há distinção entre maiusculas e minusculas ]
                                                                //flag => o que queremos que uma expressão regular busque

            if( !findExpressao.test(nomePaciente) ){ //Estre trecho testa (verifica) se o valorDigitado não está contido no nomePaciente
                //o método 'test(parametro)' da 'RegExp(valorDigitado, flag)' retorna true se for encontrado o 
                                                                        // valorDigitado no parâmetro passado ao método 'test()'

                trPaciente.classList.add("invisivel"); //se caso o valor for não for encontrado no parâmetro ele deixa o elemento visível,
                                                            // atribuindo a classe responsável por deixar a linha invisível
            }else{
                trPaciente.classList.remove("invisivel");
                
            }
    
        });
    }else{
        //se o campo não conter nenhum caractere
        listTrPacientes.forEach(function(trPaciente){
            var tdNome = trPaciente.querySelector(".info-nome");
            var nomePaciente = tdNome.textContent;
            
            trPaciente.classList.remove("invisivel");
        });
    }


});

/***************** OUTRA FORMA DE FAZER A COMPARAÇÃO SEM UTILIZAR AS EXPRESSÕES REGULARES *****************************
 * 
 * Aprendemos a como filtrar, comparar letra a letra, utilizando expressões regulares, representado pelo fragmento de código abaixo:
 * 
 * 
var expressao = new RegExp(this.value,"i");
if (!expressao.test(nome)) {
    paciente.classList.add("invisivel");
} else{
    paciente.classList.remove("invisivel");
}

Mas há um modo de fazer essa comparação sem a necessidade de utilizar expressões regulares! Podemos utilizar a função substr,
que recebe dois parâmetros, fazendo com que ela devolva parte da string, com o tamanho definido nos parâmetros. O primeiro parâmetro
é o início, começando do 0 (que representa o primeiro caractere). O segundo parâmetro define o fim (exclusivo, mostramos até o
penúltimo caractere). Por exemplo:

var string = "Alura";
var resultado = string.substr(1, 4);

Extraímos uma string que começa no segundo caractere (número 1) e termina no quarto caractere (número 3, índice anterior ao número 4).
O valor da variável resultado é:

lura

Conhecendo essa função, pense em um modo de comparar o valor digitado com parte do nome, sem utilizar expressões regulares. 
Veja em seguida a resposta do instrutor.
 * 
 * 
 * 
 * 
 * 
Como o primeiro parâmetro é o inicio, e queremos comparar desde o início da string nome, vamos utilizar como
início o valor 0, ou seja, sempre a partir do primeiro caractere. Mas qual é o fim? O fim é justamente o
tamanho do valor digitado:

nome.substr(0, this.value.length);

Podemos guardar essa string em uma variável, e compará-la com o que está sendo digitado. Caso seja falso,
adicionamos a classe invisivel, se não for, removemos-a:

var comparavel = nome.substr(0, this.value.length);
if (!(this.value == comparavel)) {
    paciente.classList.add("invisivel");
} else{
    paciente.classList.remove("invisivel");
}


Mas e a distinção entre letras maiúsculas e minúsculas? Nesse caso não temos distinção entre letras maiúsculas
e minúsculas, mas para contornar isso, antes de compará-las, podemos colocar as duas strings em letras minúsculas,
para efetuar a comparação entre elas em seguida:

var comparavel = nome.substr(0, this.value.length);
var comparavelMinusculo = comparavel.toLowerCase();
var valorDigitadoMinusculo = this.value.toLowerCase();

if (!(valorDigitadoMinusculo == comparavelMinusculo)) {
    paciente.classList.add("invisivel");
} else{
    paciente.classList.remove("invisivel");
}


Esta é uma alternativa de implementar a mesma funcionalidade sem expressão regular, porém temos que escrever
mais e nos preocupar com mais detalhes! Fica ai esta opção para você guardar nos seus conhecimentos.
*/