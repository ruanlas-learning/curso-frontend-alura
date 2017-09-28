//Este arquivo serve para fazer requisições com javaScript a dados de outra página e adicionar à tabela
//Iremos acessar o seguinte servidor via js: 'https://api-pacientes.herokuapp.com/pacientes'
//##### Requisições AJAX #######
var botaoAdicionar = document.querySelector("#buscar-pacientes");
botaoAdicionar.addEventListener("click", function(){
    //Para executar requesições com javaScript, precisamos de um objeto do tipo XMLHttpRequest
    var xhr = new XMLHttpRequest();
    //depois vamos configurar qual método HTTP iremos utilizar na requisiçao, e para qual servidor iremos enviar
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    //depois que configurarmos, iremos enviar a requisição utilizando o método 'send()'
    xhr.send();
    //depois de enviado a requisição, devemos obter a resposta do servidor. Com isso, devemos configurar um evento
    //para conseguir pegar a resposta do sevidor, que seria o evento 'load'. Esse evento será atribuído ao objeto
    //do tipo 'XMLHttpRequest' que foi criado
    xhr.addEventListener("load", function() {
        //span html que exibirá a mensagem de erro para o usuário, caso haja algum erro durante a requisição
        // e não for possível retornar os dados
        var erroAjax = document.querySelector("#erro-ajax");

        if(xhr.status == 200){ // antes de fazer qualquer instrução, iremos antes verificar se 
                    //ocorreu tudo certo na requisição, ou seja, iremos verificar o status da requisição para ver se
                    //deu algum problema, ou se deu tudo certo. O status 200 informa que a requisição foi OK

            erroAjax.classList.add("invisivel");

            // console.log(xhr.responseText); //observa-se o retorno de um JSON do servidor. Devemos converter para
                                                //um objeto JavaScript equivalente
            var respostaServidor = xhr.responseText; //obtem a resposta do servidor
            //estamos convertendo a resposta do servidor para um array de objetos 'paciente', contendo nome, peso, altura,
            //gordura e imc. Observamos que na resposta, vieram vários pacientes com estes atributos. Logo, temos um retorno
            //de uma lista de pacientes
            var pacientes = JSON.parse(respostaServidor);
            //agora que temos um array de pacientes, vamos iterar sobre cada objeto do array e adicionar à tabela
            pacientes.forEach(function(paciente) {
                var tabelaPacientes = document.querySelector("#tabela-pacientes");
                //abaixo estamos criando a trPacientes e já adicionando como filho da tabelaPacientes
                //** estamos reaproveitando a função do form.js que cria a trPaciente */
                tabelaPacientes.appendChild( criaTrPaciente(paciente) );
            });

        }else{
            console.log(xhr.status); //exibe o erro ou o status que ocorreu, caso nao dar OK na requisição
            erroAjax.classList.remove("invisivel");
        }


    });

});