$( document ).ready(function() {
    console.log( "ready!" );


     // Busca a referencia elementos da página  
  var socketStatus = document.getElementById("status");
  var messagesList = document.getElementById("lsHistorico");
  var lblDisplay = document.getElementById("lblDisplay");
  var btnCalcular = document.getElementById("btnCalcular");


  btnCalcular.onclick = function (e) {
    
    // Pega a mensagem digitada no campo de mensagem do formulário
    var message = lblDisplay.value;

    // Envia a mensagem através do websocket
    socket.send(message);

    return false;
  }

  // Cria um novo socket.
  var socket = new WebSocket("wss://historic-virgin-islands-96532.herokuapp.com");
  //var socket = new WebSocket("ws://localhost:9898/");

  // Função para tratar os erros que podem ocorrer
  socket.onerror = function (error) {
    console.log("WebSocket Error: ", error);
  };

  // Função chamada no momento da conexão do cliente com o servidor
  socket.onopen = function (event) {
    socketStatus.innerHTML =
      "Conectado ao servidor: " + event.currentTarget.url;
    socketStatus.className = "open";
  };

  // Função para tratar mensagens enviadas pelo servidor.
  socket.onmessage = function (event) {
    var message = event.data;

    var messageResult = JSON.parse(message);

    if(messageResult.type == 1){
      lblDisplay.value = messageResult.result;
      limparValores();
      limparOperador();
    } else{
      messagesList.innerHTML +=
      '<li class="received"><span>Recebido:</span>' + messageResult.result + "</li>";
    }
  };

  // Função chamada no momento da desconexão do servidor com o cliente
  socket.onclose = function (event) {
    socketStatus.innerHTML = "Websocket desconectado.";
    socketStatus.className = "closed";
  };

 
})

function bloqueiaInput(){    
  $("input").addClass("btnDisabled");
  $("input").attr("disabled",true); 
}



function adicionarValoresDisplay(){    
    $("#lblDisplay").val($("#hddValores").val() + $("#hddOperador").val());     
}

function limparValores(){
  $("#hddValores").val("");
}

function trataOperador(){
  let operadores = new RegExp(/^-?\d*\.?\d*$/);
  console.log(operadores.test($("#lblDisplay").val()))

  if(operadores.test($("#lblDisplay").val())){    
    $(".btnOperador").removeClass("btnDisabled");
    $(".btnOperador").removeAttr("disabled");
  } else{
    $(".btnOperador").addClass("btnDisabled");
    $(".btnOperador").attr("disabled",true);  
  }

}

function limparOperador(){  
  $("#hddOperador").val("");   
}

$(".btnNumero").click(function() {
    $("#hddValores").val($("#hddValores").val() + $("#hddOperador").val() +  $(this).val());  
    limparOperador();
    adicionarValoresDisplay();
    

    trataOperador();
});

$(".btnOperador").click(function() {
  if($("#hddValores").val() != "") {
    $("#hddOperador").val($(this).val());     
    adicionarValoresDisplay();
  }  
});

$("#btnDelete").click(function() {
  $("#lblDisplay").val("");  
  limparValores();
  trataOperador();     
});